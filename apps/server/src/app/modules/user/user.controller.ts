import { Request, Response } from "express";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { IUserSchema } from "./user.interface";
import { UserService } from "./user.service";
import mongoose from "mongoose";

/*
 * Controller
 */

/*
======================
- GET 
- /users/:id
======================
*/
const getSingleUserController = catchAsync(
	async (req: Request, res: Response) => {
		const { id } = req.params;

		const { userId } = req.user as JwtPayload;

		if (id !== userId) {
			throw new ApiError(httpStatus.UNAUTHORIZED, "Unauthorized access");
		}

		const result = await UserService.getSingleUserService(new mongoose.Schema.ObjectId(id));

		result &&
			sendResponse<IUserSchema>(res, {
				statusCode: httpStatus.OK,
				success: true,
				message: "User retrieved successfully",
				data: result,
			});
	}
);

export const UserController = {
	getSingleUserController,
};
