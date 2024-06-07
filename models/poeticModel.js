var mongoose = require('mongoose');


const poemSchema = mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true],
        ref : "users"
    },
    topic : {
        type : String,
        required : [true],
    },
    desc:{
        type : String,
        required : true,
    }
},{
    timestamps:true
})

module.exports = mongoose.model("poems",poemSchema);