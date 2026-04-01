import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import errorHandler from './middleware/errorHandler.js';
import authRoutes from './routes/auth.js';
import healthRoutes from './routes/health.js';
import logRoutes from './routes/logs.js';
import logger from './utils/logger.js';
import { swaggerServe, swaggerSetup } from './config/swagger.js';

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(helmet());
app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json({ limit: '10kb' }));

app.use('/auth', authRoutes);
app.use('/health', healthRoutes);
app.use('/logs', logRoutes);
app.use('/api-docs', swaggerServe, swaggerSetup);

app.use(errorHandler);

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`);
});

app.close = () => server.close();

export default app;
