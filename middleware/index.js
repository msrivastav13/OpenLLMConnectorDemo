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
    res.status(500).send('Something broke!');
};
