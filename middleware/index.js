import config from '../config/index.js';
import createSanitizedLogger from '../utils/logger.js';

const logger = createSanitizedLogger();

export const validateApiKey = (req, res, next) => {
    const apiKey = req.headers['api-key'];
    if (!apiKey || apiKey !== config.huggingFaceApiKey) {
        return res.status(401).json({ error: 'Unauthorized: Invalid API key' });
    }
    next();
};

export const errorHandler = (err, req, res, next) => {
    logger.error(err.stack);
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        error: {
            status: statusCode,
            message: message
        }
    });
};
