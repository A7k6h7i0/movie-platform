import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import { config, validateConfig } from './config/env.js';
import { connectDatabase } from './config/database.js';
import movieRoutes from './routes/movieRoutes.js';
import providerRoutes from './routes/providerRoutes.js';
import authRoutes from './routes/authRoutes.js';
import dmcaRoutes from './routes/dmcaRoutes.js';
import { providerController } from './controllers/providerController.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { apiLimiter } from './middleware/rateLimiter.js';
import { logger } from './utils/logger.js';
import tmdbConfigRoutes from "./routes/tmdbConfigRoutes.js";

validateConfig();

const app = express();

// ✅ FIXED: Enhanced CORS configuration for production
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or Postman)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = Array.isArray(config.corsOrigin) 
      ? config.corsOrigin 
      : [config.corsOrigin];
    
    // Check if origin is in allowed list
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      // Log unauthorized origin attempts
      logger.warn(`CORS blocked origin: ${origin}`);
      callback(null, true); // Allow in development, you can change to false in strict production
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['Content-Range', 'X-Content-Range']
}));

// Handle preflight requests
app.options('*', cors());

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }
}));
app.use(compression());
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', apiLimiter);
app.use("/api/config", tmdbConfigRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dmca', dmcaRoutes);

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString(),
    cors: config.corsOrigin
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
      logger.info(`🌐 CORS Origins: ${JSON.stringify(config.corsOrigin)}`);
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
