var express = require('express');
const session = require("express-session")
var router = express.Router();
const db = require("../models")
const formidable= require("formidable")
const { v4: uuidv4 } = require('uuid');
const product = require('../models/product');

let uniqueFilename = ""

router.get('/', function(req, res) {
    db.Product.findAll()
      .then(products =>{
        res.json(products)
      })
  });



router.get("/:id", (req,res)=>{
    db.Product.findByPk(req.params.id)
        .then(product => {
            if (product) {
                res.json(product)
            } else {
                res.status(404).json({
                    error: "product not found"
                })

            }

        })
}
)

router.get("/productsByUser/:id", (req, res) => {
  const { id } = req.params
  db.Product.findAll({
    where: {
      UserId: id
    }
  })
  .then(products =>{
    res.status(201).json(products)

  })
  })
//aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
  // router.get("/productsByUser", (req, res) => {
    
  //   db.Product.findAll({
  //     where: {
  //       UserId: req.session.user.id
  //     }
  //   })
  //   .then(products =>{
  //     res.status(201).json(products)
  
  //   })
  //   })


//upload pic =====================================================
function uploadFile(req,callback) {

    new formidable.IncomingForm().parse(req)
    .on('fileBegin',(name,file) => {
        uniqueFilename = `${uuidv4()}.${file.name.split(".").pop()}`
        file.name = uniqueFilename
        file.path = __basedir + '/uploads/' + file.name
    })
    .on('file',(name,file) => {
      callback(file.name)
    })
  
  }
  router.post('/upload',(req,res) => {
  
    uploadFile(req,(photoURL) => {
      photoURL = `/uploads/${photoURL}`  
      res.json({
        imageURL: photoURL
      })
      // res.render("users/add-product", {
      //   partials:{
      //       head: "/partial/head",
      //       footer: "/partial/footer",
      //       menu: "/partial/menu"
            
      //   },
      //     locals:{
      //       imageURL: photoURL,
      //       error: null
      //     }
      // })
    })
  
  })
//=====================================================

//create new Product
router.post("/",(req,res)=>{
    if(!req.body || !req.body.title || !req.body.description || !req.body.price){
      res.status(400).json({
        error: "Please Submit all required fields"
      })
      return
    }
    db.Product.create({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        imageURL: uniqueFilename,
        // UserId: null
        UserId: req.session.user.id,
        complete: req.body.complete,
        category: req.body.category

        
        
      })
      .then(products=>{
        res.status(201).json(products)
      })
  })
  

//update product
router.put("/:id", (req,res)=>{
    if(!req.body || !req.body.title || !req.body.description || !req.body.price){
      res.status(400).json({
        error: "Please Submit all required fields"
      })
      return
    }
    db.Product.update({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      imageURL: "dfsfsaf",
      complete: req.body.complete,
      category: req.body.category
      
    },{
      where:{
        id: req.params.id
      }
    })
      .then(updated =>{
        if(updated && updated[0]  === 1){
          res.status(202).json({
            success: "Post Updated"
          })
  
        }else{
          res.status(404).json({
            error: "post not found"
          })
        }
      }) 
  })


//delete post
// DELETE /api/v1/products/101
router.delete("/:id", (req,res)=>{
    db.Product.destroy({
      where:{
        id: req.params.id
      }
    })
      .then(deleted=>{
        if(deleted === 1){
          res.status(202).json({
            success: "Product deleted"
          })
        }else{
          res.status(404).json({
            error: "Product Not Found"
          })
        }
        
      })
  })
  


  //==========comment=======================================
  router.get("/:productId/comments", (req, res)=>{
    db.Comment.findAll({
      where:{
        ProductId: req.params.productId
      }
    })
    .then(comments =>{
      res.json(comments)
    })
  })
  
  // Post /api/v1/posts/102/comments
  router.post("/:productId/comments", (req, res)=>{
    if(!req.body || !req.body.title || !req.body.description){
      res.status(400).json({
        error: "Please include all required fields"
      })
      return;
    }
    db.Product.findByPk(req.params.productId)
      .then(products =>{
        if(!products){
          res.status(404).json({
            error: "No product found"
          })
        }
        return products.createComment({
          title: req.body.title,
          description: req.body.description,
          UserId: req.session.user.id
          
        })
      })
      .then(comment =>{
        console.log(comment)
        res.json({
          success: "Comment added",
          comment: comment
        })
      })
  });
  
module.exports = router