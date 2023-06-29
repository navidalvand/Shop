const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const { mainRoutes } = require("./src/Routes/Router");
const { setController } = require("./src/Controllers/Controller");

class Application {
  constructor() {
    this.configApp();
    this.startApp();
    this.connectToDB();
    this.createRoutes();
    this.errorHandeler();
  }

  configApp() {
    require("dotenv").config();
    app.use(express.json({}));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, "public")));
    app.use(cookieParser());
    app.use(morgan("dev"));
  }

  startApp() {
    let server = http.createServer(app);
    server.listen(3000, (err) => {
      if (err) return console.log(err);
      console.log("server started => http://localhost:3000");
    });
  }

  connectToDB() {
    mongoose.set("strictQuery", false);
    mongoose
      .connect(process.env.DB_URL, { useNewUrlParser: true })
      .then(console.log("connected to DataBase..."))
      .catch((err) => {
        console.log(err);
      });
  }

  createRoutes() {
    //*                                 Index Page

    app.get("/", (req, res) => {
      res.send({
        page: "home",
      });
    });

    app.use((req, res, next) => {
      setController(req, res);
      next();
    });

    app.use(mainRoutes);
  }

  errorHandeler() {
    //!                              404 Page
    app.use((req, res) => {
      res.status(404).json({
        status: 404,
        massage: "page not found",
      });
    });

    //!                             Send Errors
    app.use((err, req, res, next) => {
      const status = err?.status || 500;
      const message = err?.message || "enternal server error";
      return res.status(status).json({
        status,
        message,
      });
    });
  }
}

new Application();
