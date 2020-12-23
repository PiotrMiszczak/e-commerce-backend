import express from 'express';
import dotenv from 'dotenv'
import config from './config'
import mongoose from 'mongoose'
import userRouter from '../routes/userRoute'
//import productRoute from '../routes/productRoute'
import bodyParser from 'body-parser'
import Product from '../models/productModel'
import Order from '../models/orderModel'
import {isAuth, isAdmin} from '../util'
import uploadRouter from '../routes/uploadRoute';
import path from 'path'


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

app.use('/api/users',userRouter)
app.use('/api/uploads', uploadRouter)
//app.use('/api/products',productRoute)
app.get('/api/products', async (req,res)=>{

    const products = await Product.find({})
    res.send(products)
    })
  

app.post('/api/products',isAuth, isAdmin, async (req,res)=>{
    const products = await Product.find({})
    const product = new Product({
        //id:products.length + 1,
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
       return res.status(201).send({msg:'product created', data:newProduct})
    }
    else return res.status(500).send({msg:'request invalid'})
})

app.put('/api/products/:_id',isAuth, isAdmin, async (req,res)=>{
    const productId = req.params._id;
    const product = await Product.findById(productId)
  if(product){
    product.name=req.body.name,
    product.avatar=req.body.avatar,
    product.price=req.body.price,
    product.brand=req.body.brand,
    product.category=req.body.category,
    product.qty=req.body.qty,
    product.description=req.body.description
  }
    
        const updatedProduct = await product.save()
        if(updatedProduct){
       return res.status(200).send({msg:'product updated', data:updatedProduct})
    }
    else return res.status(500).send({msg:'request invalid'})
})

app.get("/products/api/products/:_id", async (req,res)=>{
    const productId = req.params._id;
    const product = await Product.findById(
        productId
    )
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.get("/api/products/:_id",async (req,res)=>{
    const productId = req.params._id;
    const product = await Product.findById(
        productId
    )
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});
app.delete("/api/products/:_id",isAuth, isAdmin, async (req,res)=>{
    const productId = req.params._id;
    const deletedProduct = await Product.findById(
        productId
    )
   if(deletedProduct){
       await deletedProduct.remove()
       res.send({message:'Product deleted'})}
    else{
        res.status(404).send({msg:'Error in removing'})
    }
});

app.get("/cart/api/products/:_id", async (req,res)=>{
    const productId = req.params._id;
    const product = await Product.findById(
        productId
    )
   if(product){
       res.send(product)}
    else{
        res.status(404).send({msg:'NOT xcxcFOUND'})
    }
});

app.post("/api/orders",isAuth, async (req,res)=>{
    if(req.body.orderItems.length == 0){
        res.status(400).send({message:'No items'})
    }
    else{
    const newOrder = new Order({
        orderItems: req.body.orderItems,
        user: req.user.id,
        paymentMethod: req.body.payment,
        shipping: req.body.shipping,
        totalPrice: req.body.totalPrice,
        deliveryPrice: req.body.deliveryPrice
 })
 const createdOrder = await newOrder.save()
     res.status(200).send({message:'Order created', data:createdOrder})
}
  
});

app.get("/orders/api/orders/:_id", async (req,res)=>{
   const orderId = req.params._id
   const order = await Order.findById(orderId)
   if(order){
       res.send(order)
   }
   else{
       
       res.status(404).send({message:'order not found'})
   }
   
  
});

app.get("/api/orders/mine",isAuth, async (req,res)=>{
    const orders = await Order.find({
        user: req.user.id
        
    })
    if(orders){
        res.send(orders)
    }
    else(
        res.status(404).send({message:'orders not found'})
    ) 
   
 });

 
app.get("/api/orders/all",isAuth,isAdmin, async (req,res)=>{
    const orders = await Order.find({
    })
    if(orders){
        res.send(orders)
    }
    else(
        res.status(404).send({message:'order not found'})
    ) 
   
 });

app.put("/orders/api/orders/pay/:_id",isAuth, async (req,res)=>{
    const orderId = req.params._id
    const order = await Order.findById(orderId)
    if(order){
        order.isPaid = true;
        order.paidAt = Date.now();
    
    const updatedOrder = await order.save()
    res.send({message:'order paid'})}
    else{
        
        res.status(404).send({message:'order not found'})
    }
    
   
 });

 
app.put("/orders/api/orders/deliver/:_id",isAuth, async (req,res)=>{
    const orderId = req.params._id
    const order = await Order.findById(orderId)
    if(order){
        order.isDelivered = true;
        order.deliveredAt = Date.now();
    
    const updatedOrder = await order.save()
    res.send({message:'order delivered'})}
    else{
        
        res.status(404).send({message:'order not found'})
    }
    
   
 });

app.get('/orders/api/config/paypal', async (req,res)=>{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.listen(5000, ()=>console.log('Server started at http://localhost:5000'))