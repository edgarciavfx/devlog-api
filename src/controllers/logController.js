import {
  createLog,
  getLogById,
  getLogsByUser,
  getRecentWeekLogs,
  updateLog,
  deleteLog,
} from '../repositories/logRepository.js';
import logger from '../utils/logger.js';

export const createLogEntry = async (req, res) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user.id;

    const [log] = await createLog(userId, { title, content, tags });

    logger.info({ message: 'Log created', logId: log.id, userId });
    res.status(201).json({ message: 'Log created successfully', log });
  } catch (error) {
    logger.error({ message: 'Failed to create log', error: error.message, userId: req.user?.id });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};

export const getLog = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [log] = await getLogById(id, userId);

    if (!log) {
      return res.status(404).json({ error: { message: 'Log not found' } });
    }

    res.json(log);
  } catch (error) {
    logger.error({ message: 'Failed to get log', error: error.message, userId: req.user?.id });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};

export const getLogs = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate, tags } = req.query;

    const options = {};
    if (startDate) options.startDate = startDate;
    if (endDate) options.endDate = endDate;
    if (tags) options.tags = tags.split(',').map(t => t.trim());

    const logs = await getLogsByUser(userId, options);

    res.json(logs);
  } catch (error) {
    logger.error({ message: 'Failed to get logs', error: error.message, userId: req.user?.id });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};

export const getRecentWeek = async (req, res) => {
  try {
    const userId = req.user.id;

    const logs = await getRecentWeekLogs(userId);

    res.json(logs);
  } catch (error) {
    logger.error({ message: 'Failed to get recent logs', error: error.message, userId: req.user?.id });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};

export const updateLogEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { title, content, tags } = req.body;

    const [existing] = await getLogById(id, userId);
    if (!existing) {
      return res.status(404).json({ error: { message: 'Log not found' } });
    }

    const updateData = {};
    if (title !== undefined) updateData.title = title;
    if (content !== undefined) updateData.content = content;
    if (tags !== undefined) updateData.tags = tags;

    const [updated] = await updateLog(id, userId, updateData);

    logger.info({ message: 'Log updated', logId: id, userId });
    res.json({ message: 'Log updated successfully', log: updated });
  } catch (error) {
    logger.error({ message: 'Failed to update log', error: error.message, userId: req.user?.id });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};

export const deleteLogEntry = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const [existing] = await getLogById(id, userId);
    if (!existing) {
      return res.status(404).json({ error: { message: 'Log not found' } });
    }

    await deleteLog(id, userId);

    logger.info({ message: 'Log deleted', logId: id, userId });
    res.json({ message: 'Log deleted successfully' });
  } catch (error) {
    logger.error({ message: 'Failed to delete log', error: error.message, userId: req.user?.id });
    res.status(500).json({ error: { message: 'Internal server error' } });
  }
};
