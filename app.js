// import http from "./bin/www"

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const es6Renderer = require('express-es6-template-engine');
const bodyParser = require('body-parser');
const session = require("express-session");
var cors = require('cors')
const db = require("./models")
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const store = new SequelizeStore({db:db.sequelize})


const VIEWS_PATH = path.join(__dirname,'/template')
global.__basedir = __dirname


const apiUserRouter = require("./routes/api-user")
const apiProductRouter = require("./routes/api-product")
const apiCommentRouter = require("./routes/api-comment")
const apiSocketio = require("./routes/api-chat")

var app = express();
app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE" ],
  allowedHeaders: ["my-header"],
  credentials: true
}))

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true}))
//store 
app.use(
    session({
      // key: "UserId",
      secret: 'secret', // used to sign the cookie
      resave: false, // update session even w/ no changes
      saveUninitialized: false, // always create a session
      store: store,
      proxy: true,
      
   })
  )
store.sync()


app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'client/build')));
app.use("/uploads", express.static("uploads"))

app.use("/api/v2/users", apiUserRouter)
app.use("/api/v2/products", apiProductRouter)
app.use("/api/v2/comments", apiCommentRouter)
app.use("/api/v2/chats", apiSocketio)


app.get('*', function (req, res) {  
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));});


module.exports = app;  
