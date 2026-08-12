import logger from "../utils/logger.js";

export function errorHandler(
  error,
  req,
  res,
  next
) {
  logger.error(
    error.stack ||
    error.message
  );

  const status =
    error.status || 500;

  res.status(status).json({
    success: false,

    message:
      error.message ||
      "Internal server error",

    ...(process.env.NODE_ENV ===
      "development"
      ? {
          stack: error.stack
        }
      : {})
  });
}