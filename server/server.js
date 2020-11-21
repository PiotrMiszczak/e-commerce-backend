import express from 'express';
import data from './data'
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import userRoute from '../routes/userRoute'
import bodyParser from 'body-parser'

dotenv.config();

const MONGODBURL = config.MONGODB_URL;
mongoose.connect(MONGODBURL, {
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true
}).catch(error => console.log('err2'))



const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api/users',userRoute)

app.get("/api/products", (req,res)=>{
    res.send(data.products)
});

app.get("/products/api/products/:id", (req,res)=>{
    const productId = req.params.id;
    const product = data.products.find(x=>parseInt(x.id)==productId)
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.get("/api/products/:id", (req,res)=>{
    const productId = req.params.id;
    const product = data.products.find(x=>parseInt(x.id)==productId)
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.get("/cart/api/products/:id", (req,res)=>{
    const productId = req.params.id;
    const product = data.products.find(x=>parseInt(x.id)==productId)
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.listen(5000, ()=>console.log('Server started at http://localhost:5000'))