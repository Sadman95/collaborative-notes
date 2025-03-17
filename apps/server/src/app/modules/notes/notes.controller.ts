import { Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { NoteService } from "./notes.service";

/*
 * Controller
 */

/*
================
- POST 
- /notes
================
*/
const createNoteController = catchAsync(async (req: Request, res: Response) => {
	const { ...payload } = req.body;
	const { userId } = req.user as JwtPayload;

	const newNote = await NoteService.createNoteService({ ...payload, author:userId });

	newNote &&
		sendResponse<object>(res, {
			statusCode: httpStatus.CREATED,
			success: true,
			message: "Note created successfully",
			links: {
				home: `/`,
			},
		});
});

/*
==========================
- GET 
- /notes
==========================
*/
const getNotesController = catchAsync(async (req: Request, res: Response) => {
	const { userId } = req.user as JwtPayload;

	const notes = await NoteService.getNotesService(userId);

	notes &&
		sendResponse<object>(res, {
			statusCode: httpStatus.OK,
			success: true,
			data: notes,
		});
});

/*
================
- PATCH
- /notes/:id
================
*/
const updateNoteController = catchAsync(async (req: Request, res: Response) => {
	const { ...payload } = req.body;
	const { userId } = req.user as JwtPayload;
	const { id } = req.params;

	const updatedNote = await NoteService.updateNoteService(
		{ ...payload, author: userId },
		id
	);

	updatedNote &&
		sendResponse<object>(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Note updated successfully",
			data: updatedNote,
			links: {
				home: `/`,
			},
		});
});

/*
================
- DELETE
- /notes/:id
================
*/
const deleteNoteController = catchAsync(async (req: Request, res: Response) => {
	const { userId } = req.user as JwtPayload;
	const { id } = req.params;

	const deletedNote = await NoteService.deleteNoteService(id, userId);

	deletedNote &&
		sendResponse<object>(res, {
			statusCode: httpStatus.OK,
			success: true,
			message: "Note deleted successfully",
		});
});

export const NoteController = {
	createNoteController,
	getNotesController,
	updateNoteController,
	deleteNoteController,
};
