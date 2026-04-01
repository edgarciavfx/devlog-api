export const successResponse = (data, message = 'Success', statusCode = 200) => {
  return {
    success: true,
    message,
    data,
  };
};

export const createdResponse = (data, message = 'Created successfully') => {
  return {
    success: true,
    message,
    data,
  };
};

export const errorResponse = (message = 'An error occurred', statusCode = 500, details = null) => {
  const response = {
    success: false,
    error: {
      message,
    },
  };
  if (details) {
    response.error.details = details;
  }
  return response;
};

export const validationErrorResponse = (details) => {
  return errorResponse('Validation failed', 400, details);
};

export const authErrorResponse = (message = 'Unauthorized') => {
  return errorResponse(message, 401);
};

export const notFoundResponse = (message = 'Resource not found') => {
  return errorResponse(message, 404);
};