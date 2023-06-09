const express = require("express");
const app = express();
const morgan = require("morgan");
const http = require("http");
const path = require("path");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const { mainRoutes } = require("./src/Routes/Router");
const { pathes } = require("./src/Swagger/Path.Swagger");


class Application {
  constructor() {
    this.configApp();
    this.startApp();
    this.connectToDB();
    this.createRoutes();
    this.setupSwagger();
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

  setupSwagger() {
    app.use(
      "/api-doc",
      swaggerUI.serve,
      swaggerUI.setup(
        swaggerJsDoc({
          swaggerDefinition: {
            info: {
              title: "online shop",
              version: "2.0.0",
              description: "nevid's shop",
            },
            servers: [
              {
                url: "http://localhost:3000",
              },
            ],
          },
          apis: pathes,
        })
      )
    );
  }

  createRoutes() {
    app.get("/", (req, res) => {
      res.send({
        page: "home",
      });
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
