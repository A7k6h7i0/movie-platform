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
import tmdbConfigRoutes from './routes/tmdbConfigRoutes.js';

validateConfig();

const app = express();

/* ======================================================
   🔑 REQUIRED FOR RENDER (PROXY + RATE LIMIT)
====================================================== */
app.set('trust proxy', 1);

/* ======================================================
   ✅ SIMPLE & SAFE CORS (RENDER + VERCEL FRIENDLY)
====================================================== */
const allowedOrigins = [
  'https://movie-platform-nine.vercel.app',
  'http://localhost:3000',
  'http://localhost:5173'
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// ✅ MUST handle preflight BEFORE rate limiter
app.options('*', cors());

/* ======================================================
   MIDDLEWARE
====================================================== */
app.use(helmet({
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));
app.use(compression());
app.use(morgan(config.nodeEnv === 'development' ? 'dev' : 'combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ======================================================
   ROUTES (AFTER CORS)
====================================================== */
app.use('/api', apiLimiter);
app.use('/api/config', tmdbConfigRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/dmca', dmcaRoutes);

app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'Server is running' });
});

app.use('/api/movies', movieRoutes);
app.use('/api/providers', providerRoutes);
app.get('/api/genres', providerController.getGenres);

/* ======================================================
   ERROR HANDLING
====================================================== */
app.use(notFound);
app.use(errorHandler);

/* ======================================================
   START SERVER
====================================================== */
const startServer = async () => {
  try {
    await connectDatabase();
    app.listen(config.port, () => {
      logger.success(`🚀 Server running on port ${config.port}`);
      logger.info(`📝 Environment: ${config.nodeEnv}`);
      logger.info(`🌐 Allowed Origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error.message);
    process.exit(1);
  }
};

startServer();
