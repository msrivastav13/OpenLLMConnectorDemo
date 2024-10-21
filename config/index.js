import dotenv from 'dotenv';

dotenv.config();

export default {
    port: process.env.PORT || 3000,
    huggingFaceApiKey: process.env.HUGGING_FACE_API_KEY,
    huggingFaceApiUrl:
        'https://api-inference.huggingface.co/models/mistralai/Mixtral-8x7B-Instruct-v0.1/v1/',
    corsOptions: {
        origin: process.env.ALLOWED_ORIGINS ? process.env.ALLOWED_ORIGINS.split(',') : [],
        methods: ['POST'],
        allowedHeaders: ['Content-Type', 'Authorization'],
    },
};
