const express = require("express");
const app = express();
const cors = require("cors");
const helmet = require("helmet");
const dotenv = require("dotenv");
const db = require("./src/db");
const routes = require("./src/routes");
const passport = require("./src/middleware/passport");
const session = require("express-session");
const errorHandler = require("./src/middleware/error");

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

app.use("/api", routes);

app.get("/check", (req, res) => {
  res.json({ status: true });
});

app.use(errorHandler);

db.sequelize
  .sync({ force: false, timestamps: false })
  .then(() => {
    app.listen(port, () => {
      console.log(`app is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.log(`error connection with db ${error}`);
  });
