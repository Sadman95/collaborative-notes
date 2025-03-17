import { z } from "zod";

/*
Schema validation -> create note
*/
const createNoteZodValidation = z.object({
    body: z.object({
        title: z
            .string({
                required_error: "Title is required",
            }),
        content: z
            .string({
                required_error: "Content is required",
            })
    }),
});

/*
Schema validation -> update note
*/
const updateNoteZodValidation = z.object({
	body: z.object({
		title: z.string({
			required_error: "Title is required",
		}).optional(),
		content: z.string({
			required_error: "Content is required",
		}).optional(),
	}),
});


export const NotesValidation = {
    createNoteZodValidation,
    updateNoteZodValidation,
};
