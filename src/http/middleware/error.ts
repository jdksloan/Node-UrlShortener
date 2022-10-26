import { ErrorRequestHandler } from "express";
import HttpError from "../error/HttpError";

export const errorHandler: ErrorRequestHandler = (
  err: HttpError,
  req,
  res,
  next
) => {
  console.error(`Error occurred in server:`, err);

  /**
   * Using a status code if we have one, allowing for a central erorr handling point
   */
  res.status(err.status || 500).json({
    error: {
      message: `${err}`,
    },
  });
};
