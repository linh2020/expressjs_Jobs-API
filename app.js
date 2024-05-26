require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();

const PORT = process.env.PORT || 5000;
const connectDB = require("./db/connect");
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const router = require("./routes/main");

// parsing
app.use(express.static("./public"));
app.use(express.json());

app.use("/api/v1", router);

app.get("/", (req, res) => {
  res.status(200).json({ msg: `# Jobs API with Node JS Express and MongoDB` });
});

// error-handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    connectDB(process.env.MONGO_URI);
    app.listen(PORT, () =>
      console.log(`Express server is listening on port ${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
