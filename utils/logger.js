import winston from 'winston';

const createLogger = (options = {}) => {
  const defaultOptions = {
    level: 'info',
    format: winston.format.simple(),
    transports: [new winston.transports.Console()],
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return winston.createLogger(mergedOptions);
};

export default createLogger;
