require('dotenv').config();
const express = require('express');
const controller = require('../controller/controller')
const router = express.Router();
const JWT = require('jsonwebtoken')


// Midilwear For Authenticaion 

function AuthJwt(req,res,next){
    // console.log(req.headers)
    // when token is not sent by user while requesting 
    if(req.headers.authorization === undefined)  return res.sendStatus(401)
    
    let token = req.headers.authorization.split('Token ')[1];
    
     JWT.verify(token,process.env.JWT_Secreet , (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next();
      })
    
    }

router.get('/',(req,res)=>{
    res.send('HOME')
})

// For user registeration
router.post('/register',controller.register)

// For login registeration
router.post('/login',controller.login)

// For blog creatation
router.post('/createblog',AuthJwt,controller.createBlog)

// For Getting blogs for a particular user 
router.get('/getblog',AuthJwt,controller.getBlog)

// For Getting blogs for home
router.get('/getBlogHome',controller.getBlogHome)

// For Getting blogs for home
router.get('/getBlogHome',controller.getBlogHome)

// For Adding Comment
router.post('/postComment',AuthJwt,controller.comment)

// For Adding Comment
router.post('/postLike',AuthJwt,controller.like)

// For Adding Comment
router.post('/getLike',AuthJwt,controller.getLike)

module.exports =  router;