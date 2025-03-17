import express, { Router } from "express";
import checkAuth from "../../middlewares/checkAuth";
import { limiter } from "../../middlewares/rateLimit";
import validateRequest from "../../middlewares/validateRequest";
import { NoteController } from "./notes.controller";
import { NotesValidation } from "./notes.validation";

const router: Router = express.Router();

router.use(limiter(10, 5));

router
	.route("/")
	.post(
		checkAuth,
		validateRequest(NotesValidation.createNoteZodValidation),
		NoteController.createNoteController
	)
	.get(checkAuth, NoteController.getNotesController);
router
	.route("/:id")
	.patch(
		checkAuth,
		validateRequest(NotesValidation.updateNoteZodValidation),
		NoteController.updateNoteController
	)
	.delete(checkAuth, NoteController.deleteNoteController);

export const NotessRouter = router;
