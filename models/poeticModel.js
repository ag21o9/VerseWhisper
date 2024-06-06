var mongoose = require('mongoose');


const poemSchema = mongoose.Schema({
    user_id : {
        typeof : mongoose.Schema.ObjectId.Types.ObjectId,
        required : [true],
        ref : "users"
    },
    email : {
        typeof : String,
        required : [true],
        unique : [true]
    },
    password:{
        required : true,
    }
},{
    timestamps:true
})

module.exports = mongoose.model("poems",poemSchema);