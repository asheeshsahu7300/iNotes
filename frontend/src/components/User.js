const mongoose =require('mongoose');
const {Schema}=mongoose;
const UsersSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
   
    date:{
        type:Date,
        default:Date.now
    }
})
module.exports=mongoose.model('user',UsersSchema);