import express from 'express';
import {
  createLogEntry,
  getLog,
  getLogs,
  getRecentWeek,
  updateLogEntry,
  deleteLogEntry,
} from '../controllers/logController.js';
import { validateBody, validateParams, validateQuery } from '../utils/validation.js';
import { createLogSchema, updateLogSchema, logQuerySchema, idParamSchema } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.use(authenticate);

/**
 * POST /logs
 * @summary Create a new log entry
 * @tags Logs
 * @param {object} request.body.required - Log data
 * @property {string} request.body.title - Log title
 * @property {string} request.body.content - Log content
 * @property {string[]} [request.body.tags] - Optional tags
 * @return {object} 201 - Log created successfully
 * @return {object} 400 - Validation error
 * @return {object} 500 - Internal server error
 */
router.post('/', validateBody(createLogSchema), createLogEntry);

/**
 * GET /logs
 * @summary Get all logs for the authenticated user
 * @tags Logs
 * @param {string} [startDate] - Filter by start date (ISO 8601)
 * @param {string} [endDate] - Filter by end date (ISO 8601)
 * @param {string} [tags] - Filter by tags (comma-separated)
 * @return {object} 200 - List of logs
 * @return {object} 400 - Validation error
 * @return {object} 500 - Internal server error
 */
router.get('/', validateQuery(logQuerySchema), getLogs);

/**
 * GET /logs/:id
 * @summary Get a single log by ID
 * @tags Logs
 * @param {string} id - Log ID (UUID)
 * @return {object} 200 - Log found
 * @return {object} 404 - Log not found
 * @return {object} 500 - Internal server error
 */
router.get('/:id', validateParams(idParamSchema), getLog);

/**
 * GET /logs/week/recent
 * @summary Get logs from the last 7 days
 * @tags Logs
 * @return {object} 200 - List of recent logs
 * @return {object} 500 - Internal server error
 */
router.get('/week/recent', getRecentWeek);

/**
 * PUT /logs/:id
 * @summary Update a log entry
 * @tags Logs
 * @param {string} id - Log ID (UUID)
 * @param {object} request.body - Updated log data
 * @property {string} [request.body.title] - Log title
 * @property {string} [request.body.content] - Log content
 * @property {string[]} [request.body.tags] - Optional tags
 * @return {object} 200 - Log updated successfully
 * @return {object} 404 - Log not found
 * @return {object} 500 - Internal server error
 */
router.put('/:id', validateParams(idParamSchema), validateBody(updateLogSchema), updateLogEntry);

/**
 * DELETE /logs/:id
 * @summary Delete a log entry
 * @tags Logs
 * @param {string} id - Log ID (UUID)
 * @return {object} 200 - Log deleted successfully
 * @return {object} 404 - Log not found
 * @return {object} 500 - Internal server error
 */
router.delete('/:id', validateParams(idParamSchema), deleteLogEntry);

export default router;
