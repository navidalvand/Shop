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
const {
  ResponseHandler,
} = require("./src/Services/Responses/Response.Service");

class Application {
  constructor() {
    this.configApp();
    this.startApp();
    this.connectToDB();
    this.createRoutes();
    this.setupSwagger();
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
    const port = process.env.PORT
    server.listen(port, (err) => {
      if (err) return console.log(err);
      console.log(`server started => http://localhost:${port}`);
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
      res.redirect("/api-doc");
    });

    app.use(mainRoutes);
    app.use((data, req, res, next) => {
      ResponseHandler.run(data, req, res, next);
    });
  }
}

new Application();
