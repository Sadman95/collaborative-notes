import { Model } from "mongoose";

export type IUserSchema = {
	_id: string;
	name: string;
	email: string;
	password: string;
	refreshToken: string;
};

//types for instance methods
export type IUserMethods = {
	isUserExists(obj: {
		_id?: string;
		email?: string;
	}): Promise<Partial<IUserSchema> | null>;
	isPasswordMatch(
		givenPassword: string,
		savedPassword: string
	): Promise<boolean>;
};

export type UserModel = {
	//types for static methods
	/*
	 * Pick<type, properties we want to access(or)>
	 * */
	isUserExists(obj: {
		_id?: string;
		email?: string;
	}): Promise<Pick<
		IUserSchema,
		"_id" | "name" | "email" | "password" | "refreshToken"
	> | null>;
	isPasswordMatch(
		givenPassword: string,
		savedPassword: string
	): Promise<boolean>;
} & Model<IUserSchema, Record<string, unknown>, IUserMethods>;
