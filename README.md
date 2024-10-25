# LLM Open Connector Implementation Example

This project demonstrates an implementation of the LLM Open Connector API specification, which enables the creation of API gateways and proxy servers to connect language models to the Einstein AI Platform. This example uses the Hugging Face API to showcase how any language model can be integrated with Einstein Studio using the Bring Your Own LLM (BYOLLM) feature.

The implementation features a Node.js backend with Express, adhering to the OpenAI API-based specification while incorporating robust security measures and best practices.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Features](#features)
- [API Endpoints](#api-endpoints)
- [Security Measures](#security-measures)
- [Heroku Deployment](#heroku-deployment)
- [Contributing](#contributing)
- [License](#license)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v20 or later)
- npm (usually comes with Node.js)
- Git

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/ai-chat-application.git
   cd ai-chat-application
   ```

2. Install dependencies:
   ```
   npm install
   ```

## Environment Variables

Create a `.env` file in the root directory of the project and add the following variables:

```
PORT=3000
HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
```

Replace `your_hugging_face_api_key_here` with your actual Hugging Face API key and adjust the `ALLOWED_ORIGINS` as needed.

## Running the Application

1. Start the application:
   ```
   npm start
   ```

2. The server will start on the port specified in your `.env` file (default is 3000).

## Project Structure

The project is structured as follows:

- `index.js`: Main application file
- `config/`: Configuration files
  - `index.js`: Exports configuration options
- `routes/`: API routes
  - `chat.js`: Chat-related routes
- `controllers/`: Request handlers
  - `chatController.js`: Makes calls to the chat completion API
- `middleware/`: Custom middleware functions
  - `index.js`: Includes API key validation and error handling
- `utils/`: Utility functions
  - `logger.js`: Custom logger with data sanitization

## Features

- Integration with Hugging Face API for AI-powered responses
- Express server with advanced security configurations
- CORS configuration with customizable allowed origins
- Rate limiting to prevent abuse
- API key validation for protected routes
- Comprehensive error handling and sanitized logging
- Helmet.js integration for enhanced security headers
- Chat completion controller with input validation and response reshaping
- Optimized message processing:
  - Concatenates multiple system messages into a single message
  - Preserves the order of user and assistant messages

## API Endpoints

- POST `/chat/completions`: Send a chat message and receive an AI-generated response
  - Optimizes message processing by concatenating system messages
  - Example:
    ```json
    {
      "messages": [
        {"role": "system", "content": "You are a helpful assistant."},
        {"role": "system", "content": "Always be polite."},
        {"role": "user", "content": "Hello!"},
        {"role": "assistant", "content": "Hi there!"},
        {"role": "user", "content": "How are you?"}
      ],
      "model": "gpt-3.5-turbo",
      "max_tokens": 150
    }
    ```
  - The API will process this into:
    ```json
    {
      "messages": [
        {"role": "system", "content": "You are a helpful assistant.\nAlways be polite."},
        {"role": "user", "content": "Hello!"},
        {"role": "assistant", "content": "Hi there!"},
        {"role": "user", "content": "How are you?"}
      ],
      "model": "gpt-3.5-turbo",
      "max_tokens": 150
    }
    ```

## Security Measures

- Helmet.js configuration with strict security settings:
  - Content Security Policy (CSP) with restrictive directives
  - Cross-Origin Embedder Policy
  - Cross-Origin Opener Policy
  - Cross-Origin Resource Policy
  - DNS Prefetch Control
  - Expect-CT header
  - Frameguard to prevent clickjacking
  - HTTP Strict Transport Security (HSTS)
  - IE No Open
  - X-Content-Type-Options nosniff
  - Origin-Agent-Cluster header
  - Permitted Cross-Domain Policies
  - Referrer-Policy
  - X-XSS-Protection
- CORS configuration to restrict allowed origins
- Rate limiting: 100 requests per 15 minutes per IP
- API key validation for protected routes
- Sanitized logging to prevent accidental exposure of sensitive data

## Heroku Deployment

This application is designed to be easily deployed to Heroku. Follow these steps to deploy your application:

1. Create a Heroku account if you haven't already.

2. Install the Heroku CLI:
   ```
   npm install -g heroku
   ```

3. Log in to Heroku through the CLI:
   ```
   heroku login
   ```

4. Create a new Heroku app:
   ```
   heroku create your-app-name
   ```

5. Set the environment variables on Heroku:
   ```
   heroku config:set HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
   heroku config:set ALLOWED_ORIGINS=https://your-app-name.herokuapp.com
   ```

6. Push your code to Heroku:
   ```
   git push heroku main
   ```

7. Open your deployed application:
   ```
   heroku open
   ```

Note: Ensure that your `package.json` file includes a `start` script and specifies the Node.js version in the `engines` field, as shown in the provided `package.json` file.


## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

