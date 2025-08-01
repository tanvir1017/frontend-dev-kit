import { StatusCodes } from "http-status-codes";
import AppError from "../../../../errors/appError";
import prisma from "../../../../lib/utils/prisma.utils";
import { executeWithRetry } from "../utils/retry-mechanism";

type I_ChatPayload = {
  conversationType: "DIRECT" | "GROUP";
  unreadCount: number;
  participants: string[];
  lastMessage: string;
  content: string;
};

// This will retry the transactions if its failed due to certain reasons

const createChatServices = async (userId: string, payload: I_ChatPayload) => {
  // Validate DIRECT chats have exactly 1 other participant
  if (
    payload.conversationType === "DIRECT" &&
    payload.participants.length !== 1
  ) {
    throw new AppError(
      StatusCodes.BAD_REQUEST,
      "Direct chat requires exactly 1 participant",
    );
  }

  // Merged all participant data (sender + payload participants)
  const allParticipants = [...new Set([userId, ...payload.participants])];

  const usersExist = await prisma.user.count({
    where: { id: { in: allParticipants } },
  });

  // In rare case this condition will be true. Because front-end only give those id's which are already in db
  if (usersExist !== allParticipants.length) {
    throw new AppError(StatusCodes.NOT_FOUND, "Some participants don't exist");
  }

  // Make transaction session, although in prisma mongodb doesn't support session, for creating `Conversation`, `Participants` & `Messages
  //See here: https://www.prisma.io/docs/orm/prisma-client/queries/transactions#transaction-isolation-level

  // wrapping in tryCatch, if there is any error along with the transactions.

  const { participants, content, ...conversationPayload } = payload;

  let result;
  try {
    result = await executeWithRetry(
      () =>
        prisma.$transaction(async (tx) => {
          // create the conversation first
          const createConversation = await tx.conversation.create({
            data: conversationPayload,
          });

          // create the participants collections with sender
          const participants = await Promise.all(
            allParticipants.map((userId) =>
              tx.participants.create({
                data: {
                  conversationId: createConversation.id,
                  userId,
                },
              }),
            ),
          );

          // create the message
          const messages = await tx.messages.create({
            data: {
              content: payload.content,
              conversationId: createConversation.id,
              senderId: userId,
            },
          });

          // Updating the last message for conversation
          await tx.conversation.update({
            where: { id: createConversation.id },
            data: { lastMessage: messages.content },
          });

          return {
            conversation: createConversation,
            participants,
            message: messages,
          };
        }),
      {
        maxRetries: 5,
        retryDelay: 100, // Base delay in ms, will multiply by attempts
        retryAbleErrors: ["P2028", "P2034"], // Only transactions related error codes
      },
    );
  } catch (error) {
    throw new AppError(
      StatusCodes.INTERNAL_SERVER_ERROR,
      "Something went wrong during conversation transaction!",
    );
  }

  return result;
};

export const chatServices = {
  createChatServices,
};
