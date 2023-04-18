const express = require('express');
const bodyParser = require("body-parser");
const cors = require("cors");
var path = require("path");
require('dotenv').config()
// const { Configuration, OpenAIApi } = require("openai");
const app = express();
app.use(bodyParser.urlencoded({ extended: "true" }));
app.use(bodyParser.json());
const PORT = 3000;

var allowedOrigins = [
    "http://localhost:3000",
    "http://localhost:4200",
  ];
  app.use(
    cors({
      origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
          var msg =
            "The CORS policy for this site does not " +
            "allow access from the specified Origin.";
          return callback(new Error(msg), false);
        }
        return callback(null, true);
      },
      credentials: true,
    })
  );

app.get("/api/server", function (req, res) {res.send("Hello from server");});
app.use("/api/chatbot", require("./controllers/chatbot.controller"));
app.listen(PORT, (error) =>{
    if(!error){
        console.log("Server is Running, on port "+ PORT)
                }
    else {
        console.log("Error occurred, server can't start", error);
    }
    }
)