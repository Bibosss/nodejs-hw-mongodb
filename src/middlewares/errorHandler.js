export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = status;
  res.status(status).json({
    message: message,
    data: error.message,
  });
};
