var express = require('express');
var router = express.Router();
const db = require("../models")
const bcrypt = require("bcrypt");
const session = require("express-session")

function checkAuth(req, res, next){
    if (req.session.user){
      next()
    }else {
      res.redirect("/login")
    }
  }

  router.get("/", (req, res)=>{
    db.User.findAll()
      .then(users =>{
        res.json(users)
      })
  })

  router.get("/user/:id", (req, res)=>{
    db.User.findOne({
      where: {
        id: req.params.id
      }
    })
    .then(users=>{
      res.status(201).json(users)
    })
  })

  // router.get("/user/:chatId", (req, res)=>{
  //   db.User.findOne({
  //     where: {
  //       id: req.params.id
  //     }
  //   })
  //   .then(users=>{
  //     res.status(201).json(users)
  //   })
  // })


  router.get("/current", (req, res)=>{
    db.User.findOne({
      where: {
        id: req.session.user.id
      }
    })
    .then(users=>{
      res.status(201).json(users)
    })
  })


  router.get("/register", (req,res)=>{ 
    res.status(200).json()
  })

  router.get("/login", (req, res)=>{
    if(req.session.user){
      res.send({loggedIn: true, user:req.session.user})
    }else{
      res.send({loggedIn: false})
    }
  })

  router.post("/register", (req, res)=>{
    //check if post was submitted with email and password
    if(!req.body.email || !req.body.password){
        res.status(400).json({
            error: "Please submit all required fields"
        })
        return;
      }
    const { email, password, name} = req.body
    bcrypt.hash(password, 10, (err, hash)=>{
      db.User.create({
        email: email,
        name:name,
        password: hash
      })
        .then((user)=>{ 

          res.status(200).json(user)
        })
        .catch(error=>{
          res.status(404).json({
            error: "Use another email"
          })
        }) //============
    })
    
  
  })

  router.post("/login", (req, res)=>{
    if(!req.body.email || !req.body.password){
      res.status(400).json({
          error: "Please submit all required fields"
      })
      return;
    }
    db.User.findOne({
      where: {
        email: req.body.email
      }
    })
      .then((user)=>{
        if(!user){
          res.json({
            error:"No user found"
          })
          return;
        }
        bcrypt.compare(req.body.password, user.password, (err, matched)=>{
          if(matched){
            req.session.user = user;
            // res.redirect("/")
            res.status(200).json(user)
            console.log(req.session.user)
            // res.send(user)
          }else{
            res.json({error: "Wrong password"})
          }
        })
      })
  })

  router.get("/logout", (req, res)=>{
    
    // res.status(200).json()
    req.session.user = null
    res.redirect("/")
  })
  //==========product=======================================
  router.get("/:userId/products", (req, res)=>{
    db.Product.findAll({
      where:{
        UserId: req.params.userId
      }
    })
    .then(comments =>{
      res.json(comments)
    })
  })
module.exports = router; 