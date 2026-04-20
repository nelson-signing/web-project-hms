module.exports = (err, req, res, _next) => {
    console.error(" [Global Error Handler] :", err.stack);

    // 1. Unique constraints (Email, Room Number, etc.)
    if (err.name === 'SequelizeUniqueConstraintError') {
        const field = err.errors[0].path;
        let customMessage = "This value is already in use.";
        if (field === 'email') customMessage = "Email already used";
        if (field === 'number') customMessage = "Room number already exists";
        return res.status(400).json({
            error: "Bad Request",
            message: customMessage
        });
    }

    // 2. Validation errors (Missing fields, wrong format)
    if (err.name === 'SequelizeValidationError') {
        return res.status(400).json({
            error: "Validation Error",
            message: err.errors[0].message
        });
    }

    // 3. Foreign Key constraints (Deleting a room that has bookings)
    if (err.name === 'SequelizeForeignKeyConstraintError') {
        return res.status(400).json({
            error: "Constraint Error",
            message: "Cannot delete this record because it is linked to other data."
        });
    }

    // Default Error Handling
    const statusCode = err.statusCode || err.status || 500;
    res.status(statusCode).json({
        error: err.name || "Internal Server Error",
        message: err.message || "Something went wrong on the server."
    });
};