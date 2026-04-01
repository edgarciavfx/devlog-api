import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import logger from './utils/logger.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/health', healthRoutes);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

app.close = () => server.close();

export default app;
