import app from '../src/index.js';

export default async function globalTeardown() {
  if (app.close) {
    await app.close();
  }
}