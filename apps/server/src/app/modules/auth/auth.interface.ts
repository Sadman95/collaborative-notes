export type ILoginUser = {
	email: string;
	password: string;
};

export type IRegUser = ILoginUser & {
	name: string;
};

export type ILoginUserResponse = {
	accessToken: string;
	refreshToken?: string;
};

export type IRefreshTokenResponse = {
	accessToken: string;
};

export type IPasswordData = {
	oldPassword: string;
	newPassword: string;
};
