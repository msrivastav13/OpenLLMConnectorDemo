import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import { validateApiKey, errorHandler } from './middleware/index.js';
import config from './config/index.js';
import logger from './utils/logger.js';
import chatRoutes from './routes/chat.js';

const app = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(cors(config.corsOptions));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Routes
app.use('/chat', validateApiKey, chatRoutes);

// Error handling middleware
app.use(errorHandler);

const PORT = process.env.PORT || config.port;
app.listen(PORT, () => {
  logger.info(`Server is running on port ${PORT}`);
});

export default app;
