import { Socket } from "socket.io";
import { NoteService } from "../app/modules/notes/notes.service";
import { ICreateNotePayload } from "./../app/modules/notes/notes.interface";
import { Server } from "http";

/**
 * @summary Socket starter
 * @param {httpServer} server
 * */
const socket = (server: Server) => {
	const io = require("socket.io")(server, {
		cors: {
			origin: "*", // Replace with your frontend URL
			methods: ["GET", "POST", "DELETE", "PUT"],
		},
	});

	let activeNote: Document | null = null;

	io.on("connection", (socket: Socket) => {
		console.log("User connected");

		socket.on("disconnect", () => {
			console.log("User disconnected: " + socket.id);
		});

		socket.on("join-note", async (noteId) => {
			socket.join(noteId);
			if (!activeNote) {
				const note = await NoteService.getNoteByIdService(noteId);
				activeNote = note;
				socket.emit("load-note", activeNote);
			}
		});

		socket.on(
			"edit-note",
			async (
				noteId,
				payload: Pick<ICreateNotePayload, "title" | "content">
			) => {
				const note = await NoteService.getNoteByIdService(noteId);
				activeNote = note;

				// Save to database
				const updatedNote = await NoteService.updateNoteService(
					payload,
					noteId
				);

				// Notify everyone in the room
				io.to(noteId).emit("update-note", updatedNote);
			}
		);
	});
};

export default socket;
