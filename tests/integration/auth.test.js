import request from 'supertest';
import app from '../../src/index.js';

describe('Auth Integration Tests', () => {
  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'register1@test.com',
          password: 'testpassword123',
          username: 'testuser1',
        })
        .expect('Content-Type', /json/)
        .expect(201);

      expect(response.body).toHaveProperty('message', 'User registered successfully');
      expect(response.body).toHaveProperty('userId');
    });

    it('should return 400 if email is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ password: 'password123', username: 'test' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Validation failed');
    });

    it('should return 400 if password is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({ email: 'test@test.com', username: 'test' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Validation failed');
    });

    it('should return 400 if email already exists', async () => {
      const user = {
        email: 'duplicate@test.com',
        password: 'password123',
        username: 'duplicate',
      };

      await request(app)
        .post('/auth/register')
        .send(user)
        .expect(201);

      const response = await request(app)
        .post('/auth/register')
        .send(user)
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Email already registered');
    });

    it('should return 400 for invalid email format', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'not-an-email',
          password: 'password123',
          username: 'test',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });

    it('should return 400 for short password', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'shortpass@test.com',
          password: '123',
          username: 'test',
        })
        .expect(400);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('POST /auth/login', () => {
    it('should login successfully with valid credentials', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'login1@test.com',
          password: 'password123',
          username: 'loginuser1',
        })
        .expect(201);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'login1@test.com', password: 'password123' })
        .expect(200);

      expect(response.body).toHaveProperty('token');
    });

    it('should return 401 with invalid email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'nonexistent@test.com', password: 'password123' })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Invalid credentials');
    });

    it('should return 401 with invalid password', async () => {
      await request(app)
        .post('/auth/register')
        .send({
          email: 'login2@test.com',
          password: 'password123',
          username: 'loginuser2',
        })
        .expect(201);

      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'login2@test.com', password: 'wrongpassword' })
        .expect(401);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Invalid credentials');
    });

    it('should return 400 for missing email', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ password: 'password123' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Validation failed');
    });

    it('should return 400 for missing password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({ email: 'test@test.com' })
        .expect(400);

      expect(response.body).toHaveProperty('error');
      expect(response.body.error.message).toBe('Validation failed');
    });
  });
});