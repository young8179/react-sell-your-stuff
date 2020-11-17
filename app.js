// import http from "./bin/www"

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const es6Renderer = require('express-es6-template-engine');
const bodyParser = require('body-parser');
const session = require("express-session");
var cors = require('cors')

const VIEWS_PATH = path.join(__dirname,'/template')
global.__basedir = __dirname


const apiUserRouter = require("./routes/api-user")
const apiProductRouter = require("./routes/api-product")
const apiCommentRouter = require("./routes/api-comment")

var app = express();
app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE" ],
  credentials: true
}))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}))

app.use(
    session({
      // key: "UserId",
      secret: 'secret', // used to sign the cookie
      resave: false, // update session even w/ no changes
      saveUninitialized: false, // always create a session
      cookie:{
        expires: 60 * 60 * 24
      }
      
   })
  )

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use("/uploads", express.static("uploads"))

app.use("/api/v2/users", apiUserRouter)
app.use("/api/v2/products", apiProductRouter)
app.use("/api/v2/comments", apiCommentRouter)

module.exports = app;
