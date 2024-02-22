const express = require('express');
const cors = require('cors');
const contactsRouter = require("./app/route/contact.route");
const APIError = require("./app/app-error");

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json({message: "Welcome to contact book app."});
})

app.use("/contacts", contactsRouter);

app.use((req, res, next) => {
    return next(new APIError(404, "Resource not found"));
});

app.use((err, req, res, next) => {

    return res.status(error.statusCode || 500).json({
        message: error.message || "Internal Server Error",
    });
});

module.exports = app;