import express from 'express';
import data from './data'
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import userRoute from '../routes/userRoute'
import productRoute from '../routes/productRoute'
import bodyParser from 'body-parser'
import Product from '../models/productModel'
import {isAuth, isAdmin} from '../util'

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
//app.use('/api/products',productRoute)
app.get('/api/products', async (req,res)=>{

    const products = await Product.find({})
    res.send(products)
    })
  

app.post('/api/products',isAuth, isAdmin, async (req,res)=>{
    const products = await Product.find({})
    const product = new Product({
        id:products.length + 1,
        name:req.body.name,
        avatar: req.body.avatar,
        price:req.body.price,
        brand:req.body.brand,
        category:req.body.category,
        qty:req.body.qty,
        review:req.body.review,
        numofrev:req.body.numofrev,
        description:req.body.description
    })
    
        const newProduct = await product.save()
        if(newProduct){
        res.status(201).send({msg:'product created', data:newProduct})
    }
    else return console.log('tutaj4')//res.status(401).send({msg:'request invalid'})
})
app.get("/products/api/products/:id", async (req,res)=>{
    const productId = req.params.id;
    const product = await Product.findOne({
        id:productId
    })
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.get("/api/products/:id",async (req,res)=>{
    const productId = req.params.id;
    const product = await Product.findOne({
        id:productId
    })
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.get("/cart/api/products/:id", async (req,res)=>{
    const productId = req.params.id;
    const product = await Product.findOne({
        id:productId
    })
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.listen(5000, ()=>console.log('Server started at http://localhost:5000'))