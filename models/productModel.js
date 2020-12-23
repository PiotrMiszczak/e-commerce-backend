import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
    name: {type: String, required:true },
    avatar: {type: String, required:true },
    price: {type: Number, required:true, default:0 },
    brand:{type: String, required:true },
    category:{type: String, required:true },
    qty:{type: Number, required:true, default:0},
    review:{type: Number, required:true, default:0 },
    numofrev:{type: Number, required:true, default:0 },
    description:{type: String, required:true }

})

const productModel = mongoose.model('product', productSchema)

export default productModel