const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const poeticModel = require('../models/poeticModel');
const userModel = require('../models/userModel');
function issigned(req, res, next) {

    const token = req.cookies['token'];
    if(token){
        const decoded = jwt.verify(req.cookies['token'],process.env.SECRET_TOKEN);
        req.userinfo = decoded.user;
        // console.log("user verified");
        next();
    }
    else{
        res.render('register');
    }
    
}

router.get("/",issigned, async (req, res) => {

    const blogs = await poeticModel.find();
    const user = await userModel.find();
    if(blogs[0]){
        blogs.reverse();
        res.render("index", {
          blogs: blogs});
    }
    else{
        res.redirect('/createdb')
    }
});

router.get("/createdb", issigned, (req, res) => {
    // console.log(req.userinfo.id);
    res.render("blog");
});
router.post("/create", issigned, async (req, res) => {
    let {name,topic,shayari} = req.body;

    const poem = await poeticModel.create({
        user_id : req.userinfo.id,
        topic : req.body.topic,
        desc : shayari,
        username: req.userinfo.username,
        email : req.userinfo.email
    })
    res.render('success',{success:['Post created','Your Post is successfully created']});
});

module.exports = router;
