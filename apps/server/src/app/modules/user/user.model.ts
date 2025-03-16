/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { model, Schema } from "mongoose";
import config from "../../../config";
import { IUserSchema, UserModel } from "./user.interface";

const UserSchema = new Schema<IUserSchema, UserModel>(
	{
		email: {
			type: String,
			unique: true,
			required: true,
			trim: true,
		},
		name: {
			type: String,
			trim: true,
			required: true,
		},
		password: {
			type: String,
			trim: true,
			required: true,
		},
		refreshToken: {
			type: String,
			trim: true,
		},
	},
	{
		timestamps: true,
		toJSON: {
			virtuals: true,
		},
	}
);

//hash password
UserSchema.pre("save", async function (next) {
	const user = this;

	user.password = await bcrypt.hash(
		user.password,
		Number(config.bcrypt_salt_round)
	);

	next();
});

/* check user exist or not */
UserSchema.static(
	"isUserExists",
	async function (obj: {
		id?: string;
		email?: string;
	}): Promise<Pick<IUserSchema, "_id" | "password" | "name" | "email"> | null> {
		return User.findOne(obj, {
			_id: 1,
			password: 1,
			name: 1,
			email: 1,
		}).lean();
	}
);

/* check password match or not */
UserSchema.static(
	"isPasswordMatch",
	async function (
		givenPassword: string,
		savedPassword: string
	): Promise<boolean> {
		return await bcrypt.compare(givenPassword, savedPassword);
	}
);

export const User = model<IUserSchema, UserModel>("User", UserSchema);
