/* eslint-disable no-unused-vars */
export default function errorHandler(err, req, res, next) {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(statusCode).json({
    ok: false,
    message,
    error: {
      ...(process.env.NODE_ENV !== 'production' && { stack: err.stack }),
    },
  });
}
