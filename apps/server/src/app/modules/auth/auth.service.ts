import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import { Document, ObjectId } from "mongoose";
import ApiError from "../../../errors/ApiError";
import { JwtHelpers } from "../../../helpers/jwtHelpers";
import { User } from "../user/user.model";
import { ILoginUser, IRefreshTokenResponse, IRegUser } from "./auth.interface";
import config from "../../../config";

/*
 * Service
 */

/*
================
- POST 
- /auth/signup
================
*/
const signUpService = async (payload: IRegUser): Promise<Document> => {

	//check if user exists or not
	const isExist = await User.isUserExists({ email: payload.email });

	if (isExist) {
		throw new ApiError(httpStatus.CONFLICT, "User alredy exists, please login");
	}

	const newUser = new User(payload);

	return await newUser.save();
};

/*
================
- POST 
- /auth/login
================
*/
const loginService = async (
	payload: ILoginUser
): Promise<{
	accessToken: string;
	refreshToken: string;
}> => {
	const { email, password } = payload;
	
	//check if user exists or not
	const isExist = await User.isUserExists({ email: email });

	if (!isExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
	}

	//compare password with saved password using bcrypt
	const isMatched = await User.isPasswordMatch(password, isExist?.password);	

	if (!isMatched) {
		throw new ApiError(httpStatus.CONFLICT, "Password doesn't match'");
	}

	//create accessToken & refreshToken
	const { _id: userId } = isExist;
	
	const accessToken = JwtHelpers.generateJwtToken(
		{ userId, name: isExist.name, email: isExist.email },
		config.jwt.jwt_secret as Secret,
		config.jwt.jwt_expires_in as string
	) as string;
	const refreshToken = JwtHelpers.generateJwtToken(
		{ userId, name: isExist.name, email: isExist.email },
		config.jwt.jwt_refresh_secret as Secret,
		config.jwt.jwt_refresh_expires_in as string
	);

	//update refreshToken in db
	await User.findByIdAndUpdate({ _id: userId }, { refreshToken });

	return {
		accessToken,
		refreshToken,
	};
};

/*
==========================
- POST 
- /auth/rerefreshToken
==========================
*/
const refreshTokenService = async (
	token: string
): Promise<IRefreshTokenResponse | null> => {
	let verifiedToken = null;

	try {
		verifiedToken = JwtHelpers.verifyToken(
			token,
			config.jwt.jwt_refresh_secret as Secret
		);
	} catch (error) {
		throw new ApiError(httpStatus.FORBIDDEN, "Invalid refresh token");
	}

	const { userId } = verifiedToken;

	const isUserExist = await User.isUserExists({ _id: userId });
	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
	}

	//generate new access token
	const newAccessToken = JwtHelpers.generateJwtToken(
		{ userId: isUserExist._id, name: isUserExist.name, email: isUserExist.email },
		config.jwt.jwt_secret as Secret,
		config.jwt.jwt_expires_in as string
	);

	return {
		accessToken: newAccessToken,
	};
};


/*
==========================
- GET 
- /auth/logout
==========================
*/
const logoutService = async (
	id: ObjectId
): Promise<void> => {

	const isUserExist = await User.isUserExists({ _id: id });
	if (!isUserExist) {
		throw new ApiError(httpStatus.NOT_FOUND, "User does not exist");
	}

	//remove refreshToken from db
	await User.findByIdAndUpdate({ _id: id }, { refreshToken: "" });

};

export const AuthService = {
	signUpService,
	loginService,
	refreshTokenService,
	logoutService,
};
