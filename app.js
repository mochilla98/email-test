require("dotenv").config();

const connect = require("./connectDB/connect");
const morgan = require("morgan");
const express = require("express");
const app = express();

// require routes
const userRoute = require("./routes/userRoute");
app.use("/", userRoute);

app.use(morgan("tiny"));

const port = process.env.PORT || 4000;

const start = async () => {
  try {
    await connect(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is running on port ${port}....`));
  } catch (error) {
    console.log(error);
  }
};
start();
