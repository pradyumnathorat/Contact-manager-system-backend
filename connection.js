const mongoose =require('mongoose');

mongoose.set('strictQuery', false);
const dbconnect = async ()=>{
    mongoose.connect("mongodb+srv://Pradyumna:Pradyumna@cluster0.qxvv1hh.mongodb.net/?retryWrites=true&w=majority",{ useNewUrlParser: true });
    mongoose.connection.on('connected',()=> console.log("Database Connected!!!"));
    mongoose.connection.on('error',(e)=>console.log(e));
    mongoose.connection.on('disconnected',()=>console.log("------------Database Disconnected---------"))
}

module.exports= dbconnect;
