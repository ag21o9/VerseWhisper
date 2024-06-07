const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken');
const poeticModel = require('../models/poeticModel');
function issigned(req, res, next) {

    const token = req.cookies['token'];
    if(token){
        const decoded = jwt.verify(req.cookies['token'],process.env.SECRET_TOKEN);
        req.userinfo = decoded.user;
        console.log("user verified");
        next();
    }
    else{
        res.send('login first');
    }
    
}

router.get("/", async (req, res) => {

    const blogs = await poeticModel.find();
    // console.log(blogs[0].topic);
    if(blogs[0]){
        res.render("index", {
          blogs: blogs,
        });
    }
    else{
        res.send("NO Blogs currently")
    }
});

router.get("/getblog/:id", (req, res) => {
  console.log(req.params.id);
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
        desc : shayari
    })
    console.log(poem);
    res.render('success');
});

module.exports = router;
