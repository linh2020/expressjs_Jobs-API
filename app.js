require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;

// DB Connection
const connectDB = require("./db/connect");

// Routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");

// Middlewares
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

// parsing
app.use(express.static("./public"));
app.use(express.json());

// Routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);

// error-handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Express server is listening on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
