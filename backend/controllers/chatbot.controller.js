var express=require('express');
var router=express.Router();
var chat=require('../services/chatbot')
router.post('/chat',chatController);
module.exports=router;

function chatController(req, res) {
    chat.getBotResponse(req, res)
    .then((result)=>{
        res.status(200).send({result:result,time:new Date().getTime()});
    })
    .catch(err=>{console.log(err)})
}
