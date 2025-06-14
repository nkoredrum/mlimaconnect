require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const compression = require('compression');
const { StatusCodes } = require('http-status-codes');

// Import routes
const apiRoutes = require('./src/routes/api');
const testDbRoutes = require('./src/routes/testDb');

const app = express();
const PORT = process.env.PORT || 3000;

// Trust proxy
app.enable('trust proxy');

// Set security HTTP headers
app.use(
    helmet({
        contentSecurityPolicy: {
            directives: {
                ...helmet.contentSecurityPolicy.getDefaultDirectives(),
                "frame-src": ["'self'", 'https://docs.google.com'],
            },
        },
    })
);

// Development logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

// Limit requests from same API
const limiter = rateLimit({
    max: 100, // 100 requests per hour
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Prevent parameter pollution
app.use(hpp({
    whitelist: [
        'duration',
        'ratingsQuantity',
        'ratingsAverage',
        'maxGroupSize',
        'difficulty',
        'price'
    ]
}));

// Compress responses
app.use(compression());

// Test middleware
app.use((req, res, next) => {
    req.requestTime = new Date().toISOString();
    next();
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api', apiRoutes);
app.use('/api', testDbRoutes);

// Handle client-side routing, return all requests to the app
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Handle 404 - Not Found
app.all('*', (req, res, next) => {
    res.status(StatusCodes.NOT_FOUND).json({
        status: 'fail',
        message: `Can't find ${req.originalUrl} on this server!`
    });
});

// Global error handling middleware
app.use((err, req, res, next) => {
    console.error('ERROR 💥', err);
    
    const statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;
    const status = err.status || 'error';
    
    if (process.env.NODE_ENV === 'development') {
        res.status(statusCode).json({
            status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    } else if (process.env.NODE_ENV === 'production') {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            return res.status(statusCode).json({
                status,
                message: err.message
            });
        }
        
        // Programming or other unknown error: don't leak error details
        console.error('ERROR 💥', err);
        
        // Send generic message
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} in ${process.env.NODE_ENV} mode`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
    console.error('UNHANDLED REJECTION! 💥 Shutting down...');
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
    console.error('UNCAUGHT EXCEPTION! 💥 Shutting down...');
    console.error(err);
    server.close(() => {
        process.exit(1);
    });
});

// Handle SIGTERM for graceful shutdown
process.on('SIGTERM', () => {
    console.log('👋 SIGTERM RECEIVED. Shutting down gracefully');
    server.close(() => {
        console.log('💥 Process terminated!');
    });
});
