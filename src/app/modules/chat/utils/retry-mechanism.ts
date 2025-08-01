import { Prisma } from "@prisma/client";
import { StatusCodes } from "http-status-codes";
import AppError from "../../../../errors/appError";

export async function executeWithRetry<T>(
  fn: () => Promise<T>,
  options?: {
    maxRetries?: number;
    retryDelay?: number;
    retryAbleErrors?: string[];
  },
): Promise<T> {
  const {
    maxRetries = 2,
    retryDelay = 100,
    retryAbleErrors = ["P2028", "P2034"],
  } = options || {};
  let attempt = 0;

  while (attempt <= maxRetries) {
    try {
      return await fn(); // returning the function will receive. In this case the transaction function by `prisma.$transaction`
    } catch (error) {
      // when to give the error. In this case only for `transactions` error will be cached, not other like `validation errors`
      const shouldRetry =
        error instanceof Prisma.PrismaClientKnownRequestError &&
        retryAbleErrors.includes(error.code);

      if (!shouldRetry || attempt >= maxRetries) {
        throw error;
      }

      attempt++;
      const delay = retryDelay * Math.pow(2, attempt); // Exponential backoff --> Retry after few delay
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  }
  throw new AppError(
    StatusCodes.INTERNAL_SERVER_ERROR,
    `Failed after ${maxRetries} retries`,
  );
}
