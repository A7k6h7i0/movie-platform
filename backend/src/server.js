import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { config, validateConfig } from './config/env.js';
import { connectDatabase } from './config/database.js';
import movieRoutes from './routes/movieRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import { providerController } from './controllers/providerController.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { logger } from './utils/logger.js';
import tmdbConfigRoutes from "./routes/tmdbConfigRoutes.js";

validateConfig();

const app = express();

app.use(helmet());
app.use(compression());
app.use(cors({
  origin: config.corsOrigin,
  credentials: true
}));
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiLimiter);
app.use("/api/config", tmdbConfigRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

app.use('/api/movies', movieRoutes);
app.use('/api/providers', providerRoutes);
app.get('/api/genres', providerController.getGenres);

app.use(notFound);
app.use(errorHandler);

const startServer = async () => {
  try {
    await connectDatabase();
    
    app.listen(config.port, () => {
      logger.success(`🚀 Server running on port ${config.port}`);
      logger.info(`📝 Environment: ${config.nodeEnv}`);
      logger.info(`🌐 CORS Origin: ${config.corsOrigin}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();

process.on('SIGINT', () => {
  logger.info('🛑 Shutting down gracefully...');
  process.exit(0);
});

process.on('unhandledRejection', (err) => {
  logger.error('Unhandled Rejection:', err);
  process.exit(1);
});
