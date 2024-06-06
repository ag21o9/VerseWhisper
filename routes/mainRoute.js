const express = require('express');
const router = express.Router();



function issigned(req,res,next){
    
}

router.get('/',(req,res)=>{
    res.render("index",{blogs:[{title:"NamoBharat",desc:"This is New India",id:"alpha420"}]})
})

router.get('/:id',(req,res)=>{
    console.log(req.params.id);
})

router.get('/createdb',issigned,(req,res)=>{
    res.send("hello world");
})
router.post('/create',issigned,(req,res)=>{

})

module.exports = router;