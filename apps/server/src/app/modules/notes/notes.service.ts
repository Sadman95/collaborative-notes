import httpStatus from "http-status";
import { Document, ObjectId } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { User } from "../user/user.model";
import { ICreateNotePayload } from "./notes.interface";
import { Notes } from "./notes.model";

/*
 * Service
 */

/*
================
- POST 
- /notes
================
*/
const createNoteService = async (
	payload: ICreateNotePayload
): Promise<Document> => {
	//check if user exists or not
	const isExist = await User.isUserExists({ _id: payload.author });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
	}

	const newNote = new Notes(payload);

	return await newNote.save();
};

/*
==========================
- GET 
- /notes
==========================
*/
const getNotesService = async (
	userId: ObjectId
): Promise<Record<string, any>[] | null> => {
	//check if user exists or not
	const isExist = await User.isUserExists({ _id: userId });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
	}

	return await Notes.find({}, {"__v": 0}).populate('author', 'name email -_id').sort({ updatedAt: -1 }).lean()
};

/*
==========================
- GET 
- /notes/:id
==========================
*/
const getNoteByIdService = async (
	noteId: string
): Promise<Document | null> => {
	//check if user exists or not
	const note = await Notes.findById({ _id: noteId });

	if (!note) {
		throw new ApiError(httpStatus.NOT_FOUND, "Note does not exist");
	}

	return note;
};

/*
================
- PATCH
- /notes/:id
================
*/
const updateNoteService = async (
	payload: Partial<ICreateNotePayload>,
	noteId: string
): Promise<Document | null> => {
	//check if note exists or not
	const isExistNote = await Notes.find({ _id: noteId });

	if (!isExistNote) {
		throw new ApiError(httpStatus.NOT_FOUND, "No note found");
	}

	return await Notes.findByIdAndUpdate({ _id: noteId }, payload, {
		new: true,
		projection: { __v: 0 },
	});
};

/*
================
- DELETE
- /notes/:id
================
*/
const deleteNoteService = async (
	noteId: string,
	authorId: ObjectId
): Promise<Document | null> => {
	//check if note exists or not
	const isExistNote = await Notes.findOne({ _id: noteId, author: authorId });

	if (!isExistNote) {
		throw new ApiError(httpStatus.NOT_FOUND, "No note found");
	}

	return await Notes.findOneAndDelete({ _id: noteId, author: authorId });
};

export const NoteService = {
	createNoteService,
	getNotesService,
	updateNoteService,
	deleteNoteService,
	getNoteByIdService,
};
