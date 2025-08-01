import { NextFunction, Request, Response } from "express";
import { AnyZodObject } from "zod";
import asyncHandler from "../../lib/utils/asyncHandler";

const sanitizeClientDataViaZod = (schema: AnyZodObject) =>
  asyncHandler(async (req: Request, __res: Response, next: NextFunction) => {
    const formBodyData = req.body?.data;
    // ** will applicable when there are no request body(in updatable route, where there could be the data or not)
    if (!req.body) {
      next();
    }

    // ** will applicable when there are no request body(in updatable route, where there could be the data or not)
    else if (formBodyData !== undefined && formBodyData !== null) {
      await schema.parseAsync({
        body: JSON.parse(req.body.data),
        cookies: req.cookies,
      });
      next();
    }

    // ** will applicable when there are request body
    else {
      await schema.parseAsync({
        body: req.body,
        cookies: req.cookies,
      });
      next();
    }
  });

export default sanitizeClientDataViaZod;
