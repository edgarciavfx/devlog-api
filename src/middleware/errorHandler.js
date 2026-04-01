import logger from '../utils/logger.js';

const errorHandler = (err, req, res, next) => {
  logger.error(err.message, { stack: err.stack, status: err.status });
  res.status(err.status || 500).json({
    error: {
      message: err.message || 'Internal Server Error',
    },
  });
};

export default errorHandler;
