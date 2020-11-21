import express from 'express'
import Product from '../models/productModel'


const router = express.Router();

router.get('/', async (req,res)=>{

    const products = await Product.find({})
    if(products){
        return res.send(products)
    }
    else return res.status(401).send({msg:'no products'})
})

router.post('/', async (req,res)=>{

    const product = new Product({
        id: req.body.id,
        name:req.body.name,
        avatar: req.body.avatar,
        price:req.body.price,
        brand:req.body.brand,
        category:req.body.category,
        review:req.body.review,
        numofrev:req.body.numofrev,
        description:req.body.description
    })
    
        const newProduct = await product.save()
        if(newProduct){
        return res.send(newProduct)
    }
    else return res.status(401).send({msg:'request invalid'})
})


export default router