/* eslint-disable @typescript-eslint/no-this-alias */
import { model, Schema } from "mongoose";
import { INoteSchema, NoteModel } from "./notes.interface";

const NoteSchema = new Schema<INoteSchema, NoteModel>(
	{
		title: {
			type: String,
			required: true,
			trim: true,
		},
		content: {
			type: String,
			trim: true,
			required: true,
		},
		author: {
			type: Schema.Types.ObjectId,
            ref: "User",
			required: true,
		},
	},
    {
        timestamps: true,
	}
);



export const Notes = model<INoteSchema, NoteModel>("Notes", NoteSchema);
