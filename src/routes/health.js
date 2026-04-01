import express from 'express';

const router = express.Router();

/**
 * GET /health
 * @summary Health check endpoint
 * @tags Health
 * @return {object} 200 - Service is running
 * @return {object} 500 - Service error
 */
router.get('/', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;