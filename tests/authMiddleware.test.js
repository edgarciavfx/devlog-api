const mockVerifyToken = jest.fn();
const mockLogger = {
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};

jest.unstable_mockModule('../src/utils/auth.js', () => ({
  verifyToken: mockVerifyToken,
}));

jest.unstable_mockModule('../src/utils/logger.js', () => ({
  default: mockLogger,
}));

const { authenticate } = await import('../src/middleware/auth.js');

describe('Auth Middleware', () => {
  let mockReq, mockRes, mockNext;

  beforeEach(() => {
    mockReq = { headers: {} };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
    jest.clearAllMocks();
  });

  it('should return 401 if no authorization header', async () => {
    authenticate(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: 'Unauthorized: No token provided' },
    });
  });

  it('should return 401 if authorization header does not start with Bearer', async () => {
    mockReq.headers.authorization = 'Basic token123';

    authenticate(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: 'Unauthorized: No token provided' },
    });
  });

  it('should return 401 if token is invalid', async () => {
    mockReq.headers.authorization = 'Bearer invalid_token';
    mockVerifyToken.mockImplementation(() => {
      throw new Error('Invalid token');
    });

    authenticate(mockReq, mockRes, mockNext);

    expect(mockRes.status).toHaveBeenCalledWith(401);
    expect(mockRes.json).toHaveBeenCalledWith({
      error: { message: 'Unauthorized: Invalid token' },
    });
  });

  it('should call next() if token is valid', async () => {
    mockReq.headers.authorization = 'Bearer valid_token';
    mockVerifyToken.mockReturnValue({ id: '123', email: 'test@example.com' });

    authenticate(mockReq, mockRes, mockNext);

    expect(mockNext).toHaveBeenCalled();
    expect(mockReq.user).toEqual({ id: '123', email: 'test@example.com' });
  });
});