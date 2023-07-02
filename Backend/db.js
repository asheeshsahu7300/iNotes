
const mongoose =require('mongoose');
const dotenv=require('dotenv');

dotenv.config();
const port = process.env.PORT || 5000;
const url=process.env.db_url;
 

 const connectToMongo=()=>{
    mongoose.connect(url,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{
        console.log("DB connection successful");
    }).catch((err)=>console.log(err));
}
module.exports=connectToMongo;

