import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    id: {type: Number },
    name: {type: String },
    avatar: {type: String },
    price: {type: Number },
    brand:{type: String },
    category:{type: String },
    review:{type: Number },
    numofrev:{type: Number },
    description:{type: String }

})

const productModel = mongoose.Model('product', productSchema)

export default productModel