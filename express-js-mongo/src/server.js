const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const routes = require("./routes");
const passport = require("./middleware/passport");
const session = require("express-session");
const errorHandler = require("./middleware/error");

dotenv.config();
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(
  session({
    resave: false,
    saveUninitialized: true,
    secret: process.env.ACCESS_KEY || "",
  })
);

app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 5000;
const connectionString = process.env.DB_CONNECTION || "";

app.use("/api", routes);

app.use(errorHandler);

mongoose.connect(
  connectionString,
  {
    useNewUrlParser: true,
  },
  (err) => {
    if (err) {
      console.log(`error connect db : ${err}`);
    } else {
      app.listen(port, () => {
        console.log(`app running port ${port}`);
      });
    }
  }
);
