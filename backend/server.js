require('dotenv').config();
const express = require('express');
const { swaggerUi, specs } = require('./swagger');
const db = require('./models');

const app = express();

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.static('public'));

// Routes
const authRoutes = require('./routes/auth.routes');
const roomRoutes = require('./routes/room.routes');
const bookingRoutes = require('./routes/booking.routes');

app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/bookings', bookingRoutes);

// noinspection JSCheckFunctionSignatures
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Error Handler
const errorHandler = require('./middlewares/error.handler');
app.use(errorHandler);

const PORT = process.env.PORT || 3000;

db.sequelize.authenticate()
    .then(() => {
        console.log('Database connected');
        return db.sequelize.sync();
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
            console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
        });
    })
    .catch(err => {
        console.error('Connection error:', err);
    });