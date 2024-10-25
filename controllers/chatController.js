import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import Joi from 'joi';
import config from '../config/index.js';
import winston from 'winston';

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
    ],
});

const chatCompletionSchema = Joi.object({
    messages: Joi.array()
        .items(
            Joi.object({
                role: Joi.string().valid('system', 'user', 'assistant').required(),
                content: Joi.string().required(),
            })
        )
        .min(1)
        .required(),
    model: Joi.string().default('mistralai/Mixtral-8x7B-Instruct-v0.1'),
    max_tokens: Joi.number().integer().min(1).default(500),
    temperature: Joi.number().min(0).max(1),
    n: Joi.number().integer().min(1).default(1),
    parameters: Joi.object({
        top_p: Joi.number().min(0).max(1),
    }),
});

export const chatCompletion = async (req, res, next) => {
    try {
        const { error, value } = chatCompletionSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }

        const huggingFaceRequestBody = {
            model: 'mistralai/Mistral-7B-Instruct-v0.3',
            messages: value.messages,
            max_tokens: value.max_tokens,
            stream: false,
        };

        if (value.temperature !== undefined) {
            huggingFaceRequestBody.temperature = value.temperature;
        }
        if (value.parameters && value.parameters.top_p !== undefined) {
            huggingFaceRequestBody.top_p = value.parameters.top_p;
        }

        const response = await axios.post(
            `${config.huggingFaceApiUrl}chat/completions`,
            huggingFaceRequestBody,
            {
                headers: {
                    Authorization: `Bearer ${config.huggingFaceApiKey}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        const reshapedResponse = {
            id: uuidv4(),
            object: response.data.object,
            created: response.data.created,
            model: response.data.model,
            choices: response.data.choices,
            usage: response.data.usage,
        };

        res.status(200).json(reshapedResponse);
    } catch (error) {
        logger.error('Error in chat completion:', error);
        next(error);
    }
};
