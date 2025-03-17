import { Model, ObjectId } from "mongoose";

export type ICreateNotePayload = {
    title: string;
    content: string;
    author: ObjectId;
};

export type INoteSchema = ICreateNotePayload & {
	_id: string;
};



export type NoteModel = Model<INoteSchema, Record<string, unknown>>;
