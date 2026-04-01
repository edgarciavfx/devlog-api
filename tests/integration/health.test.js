import request from 'supertest';
import app from '../../src/index.js';

describe('Health Check Integration Tests', () => {
  describe('GET /health', () => {
    it('should return 200 OK with status', async () => {
      const response = await request(app)
        .get('/health')
        .expect(200);

      expect(response.body).toHaveProperty('status', 'ok');
      expect(response.body).toHaveProperty('environment');
      expect(response.body).toHaveProperty('timestamp');
      expect(response.body).toHaveProperty('uptime');
    });

    it('should return JSON content type', async () => {
      const response = await request(app)
        .get('/health')
        .expect('Content-Type', /json/);

      expect(response.headers['content-type']).toContain('application/json');
    });
  });
});