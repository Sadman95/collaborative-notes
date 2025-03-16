import { Secret } from "jsonwebtoken";
import config from "../../../config";
import { JwtHelpers } from "../../../helpers/jwtHelpers";

//decode suer
export const decodedUser = async (token: string) => {
	const decoded = JwtHelpers.verifyToken(
		token,
		config.jwt.jwt_secret as Secret
	);
	return decoded;
};
