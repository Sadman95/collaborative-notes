import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.routes";
import { UserRoutes } from "../modules/user/user.routes";
import { NotessRouter } from "../modules/notes/notes.routes";

export type IRoute = {
	path: string;
	router: Router;
};

export const routes: IRoute[] = [
	{
		path: "/auth",
		router: AuthRoutes,
	},
	{
		path: "/users",
		router: UserRoutes,
	},
	{
		path: "/notes",
		router: NotessRouter,
	},
];
