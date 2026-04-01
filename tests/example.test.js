import request from 'supertest';
import app from '../src/index.js';

describe('Example Routes', () => {
  afterAll(() => {
    app.close();
  });

  test('GET /api/example should return hello world', async () => {
    const res = await request(app).get('/api/example');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ message: 'Hello World' });
  });

  test('POST /api/example should return received data', async () => {
    const res = await request(app).post('/api/example').send({ data: 'test' });
    expect(res.status).toBe(201);
    expect(res.body).toEqual({ received: 'test' });
  });
});
