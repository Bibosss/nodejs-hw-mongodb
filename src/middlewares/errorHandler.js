export const errorHandler = (error, req, res, next) => {
  const { status = 500, message = 'Something went wrong' } = error;
  res.status(status).json({
    message,
    data: error.message,
  });
};
