require('dotenv').config();
const express=require('express');
const appServer=express();
const PORT=process.env.PORT||6800;
const mongoose=require('mongoose');

const aggRouter=require('./router/aggRouter');

appServer.use(express.urlencoded({extended:true}));
appServer.use(express.json());

appServer.use(aggRouter);
mongoose.connect(process.env.DB_URL)
.then(res=>{
    console.log("Database connected successfully");
    appServer.listen(PORT,()=>{
        console.log(`Server is running at http://localhost:${PORT}`);
    })
})
.catch(err=>{
    console.log("Database is not connected yet",err);
})