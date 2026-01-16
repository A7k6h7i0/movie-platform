export const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err);

  const statusCode = err.response?.status || err.statusCode || 500;
  const message = err.response?.data?.status_message || err.message || 'Internal server error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
};

export const notFound = (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
};
