import { Router } from "express";

import { StatusCodes } from "http-status-codes";
import env from "../../config/clean-env";
import sendResponse from "../../lib/utils/sendResponse";
import { authRoutes } from "../modules/auth/routes/auth.routes";
import { chatRoutes } from "../modules/chat/routes/chat.routes";
import { userRoutes } from "../modules/user/routes/user.route";

const routes = Router();

type T_RouteModules = { path: string; routes: Router };

const routesModule: T_RouteModules[] = [
  {
    path: "/users",
    routes: userRoutes,
  },
  {
    path: "/auth",
    routes: authRoutes,
  },
  {
    path: "/chats",
    routes: chatRoutes,
  },
  // Extra but use full
  {
    path: "/route-lists",
    routes: routes.get("/", async (req, res) => {
      sendResponse(res, {
        statuscode: StatusCodes.OK,
        success: true,
        message: "Route Lists",
        data: routesModule.map(
          (item: T_RouteModules) =>
            `${env.isDev ? env.LOCAL_API_URL : env.PROD_API_URL}/api/v1/${item.path}`,
        ),
      });
    }),
  },
];

// TODO: Implement routes here
routesModule.forEach((item: T_RouteModules) =>
  routes.use(item.path, item.routes),
);

export default routes;
