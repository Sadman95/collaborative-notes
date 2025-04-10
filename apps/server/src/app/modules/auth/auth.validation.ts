import { z } from "zod";

/*
Schema validation -> register
*/
const signupZodValidation = z.object({
	body: z.object({
		name: z
			.string({
				required_error: "Name is required",
			})
			.min(3, "Name must be at least 3 characters long")
			.max(20, "Name must be at most 20 characters long"),
		email: z
			.string({
				required_error: "Email is required",
			})
			.email({
				message: "Please enter a valid email address",
			}),
		password: z.string({
			required_error: "Password is required",
		}),
	}),
});

/*
Schema validation -> login
*/
const loginZodValidation = z.object({
	body: z.object({
		email: z
			.string({
				required_error: "Email is required",
			})
			.email({
				message: "Please enter a valid email address",
			}),
		password: z.string({
			required_error: "Password is required",
		}),
	}),
});

/*
Schema validation -> login
*/
const refreshTokenZodValidation = z.object({
	cookies: z.object({
		refresh_token: z.string({
			required_error: "Refresh token is required",
		}),
	}),
});

/*
Schema validation -> change password
 */
const forgetPasswordValidation = z.object({
	body: z.object({
		newPassword: z.string({
			required_error: "New password is required",
		}),
	}),
});

/*
Schema validation -> change password
 */
const changePasswordValidation = z.object({
	body: z.object({
		oldPassword: z.string({
			required_error: "Old password is required",
		}),
		newPassword: z.string({
			required_error: "New password is required",
		}),
	}),
});

export const AuthValidation = {
	loginZodValidation,
	refreshTokenZodValidation,
	changePasswordValidation,
	signupZodValidation,
	forgetPasswordValidation,
};
