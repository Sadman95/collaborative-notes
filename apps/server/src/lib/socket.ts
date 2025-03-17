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
			methods: ["GET", "POST", "DELETE", "PATCH"],
		},
	});

	let activeNote: Document | null = null;

	io.on("connection", (socket: Socket) => {
		console.log("User connected");

		socket.on("disconnect", () => {
			console.log("User disconnected: " + socket.id);
		});

		socket.on("join-note", (noteData) => {
			socket.join(noteData._id);
			if (!activeNote) {
				activeNote = noteData;
				// socket.emit("load-note", activeNote);
			}
		});

		socket.on("edit-note", ({ currentUser, noteData }) => {

			// Notify everyone in the room
			socket.broadcast
				.to(noteData._id)
				.emit("editing-note", `${currentUser.name} is editing...`);
		});
	});
};

export default socket;
