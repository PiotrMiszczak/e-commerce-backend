import express from 'express'
import Product from '../models/productModel'
import {isAuth, isAdmin} from '../util'

const router = express.Router();

router.get('/', async (req,res)=>{

    const products = await Product.find({})
    res.send(products)
    })
  

router.post('/',isAuth, isAdmin, async (req,res)=>{
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


export default router