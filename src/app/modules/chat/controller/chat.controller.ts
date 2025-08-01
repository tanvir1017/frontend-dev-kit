import { StatusCodes } from "http-status-codes";
import asyncHandler from "../../../../lib/utils/asyncHandler";
import sendResponse from "../../../../lib/utils/sendResponse";

const createConversationAndMessage = asyncHandler(async (req, res) => {
  let result;

  sendResponse(res, {
    statuscode: StatusCodes.CREATED,
    success: true,
    message: "A new conversation and corresponding chat created",
    data: result,
  });
});

export const userControllers = {
  createConversationAndMessage,
};
