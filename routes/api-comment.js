var express = require('express');
const { route } = require('../app');
var router = express.Router();
const db = require("../models")

// PUT /api/v1/comments/:commentId
router.put("/:commentId", (req, res)=>{
  if(!req.body || !req.body.title || !req.body.description ){
      res.status(400).json({
        error: "Please Submit all required fields"
      })
      return
    }
    db.Comment.update({
      title: req.body.title,
      description: req.body.description,
      
      
    },{
      where:{
        id: req.params.commentId
      }
    })
      .then(updated =>{
        if(updated && updated[0]  === 1){
          res.status(202).json({
            success: "comment Updated"
          })
  
        }else{
          res.status(404).json({
            error: "comment not found"
          })
        }
      }) 
})


//Delete /api/v1/comments/:commentId
router.delete("/:commentId", (req, res)=>{
  db.Comment.destroy({
      where:{
        id: req.params.commentId
      }
    })
      .then(deleted=>{
        if(deleted === 1){
          res.status(202).json({
            success: "Comment deleted"
          })
        }else{
          res.status(404).json({
            error: "Comment Not Found"
          })
        }
        
      })
})



//
module.exports = router;