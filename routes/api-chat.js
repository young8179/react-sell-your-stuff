const express = require("express")
const router = express.Router()
const db = require("../models")



router.get("/", (req,res)=>{
    db.Chat.findAll()
      .then(chats =>{
        res.json(chats)
      })
})
//=============================chat by category
router.get("/buy", (req, res)=>{
db.Chat.findAll({
    where: {
    category: "Buy"
    }
})
.then(chatsB=>{
    res.status(201).json(chatsB)
})
})

router.get("/sell", (req, res)=>{
    db.Chat.findAll({
        where: {
        category: "Sell"
        }
    })
    .then(chatsS=>{
        res.status(201).json(chatsS)
    })
    })

router.get("/buy", (req, res)=>{
    db.Chat.findAll({
        where: {
        category: "Trade"
        }
    })
    .then(chatsT=>{
        res.status(201).json(chatsT)
    })
    })




router.post("/", (req, res)=>{
    
    db.Chat.findByPk()
      .then(chats =>{
        
        db.Chat.create({
          content: req.body.content,
          category: req.body.category,
          UserId: req.session.user.id,
          
          
        })
        
      })
      .then(chat =>{
        
        res.json({
          success: "Comment added",
          chat: chat
        })
      })
  });






module.exports = router;

