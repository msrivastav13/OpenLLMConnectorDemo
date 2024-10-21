import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import winston from 'winston';
import { validateApiKey, errorHandler } from './middleware/index.js';
import config from './config/index.js';
import createLogger from './utils/logger.js';
import chatRoutes from './routes/chat.js';

// Create logger with sensitive data filtering
const logger = createLogger({
  format: winston.format.combine(
    winston.format.simple(),
    winston.format.printf(({ level, message }) => {
      const sanitizedMessage = message
        .replace(/Authorization:.*?(?=\s|$)/gi, 'Authorization: [REDACTED]')
        .replace(/api[_-]?key:.*?(?=\s|$)/gi, 'api_key: [REDACTED]');
      return `${level}: ${sanitizedMessage}`;
    })
  ),
});

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(config.corsOptions));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/chat', validateApiKey, chatRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
});

export default app;
