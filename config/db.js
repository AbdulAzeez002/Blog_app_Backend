const mongoose=require('mongoose')

const dotenv=require('dotenv')
dotenv.config()
// mongoose.connect('mongodb://127.0.0.1:27017/DemoBlog',{
//     useNewUrlParser:true,
   
// }).then(()=>{
//     console.log('db connected');
// }).catch((e)=>{
//     console.log('db not connected');
// })

mongoose.connect(process.env.MONGO_URL)
.then(()=>console.log('db connected successful'))
.catch((error)=>{
    console.log(error)
})