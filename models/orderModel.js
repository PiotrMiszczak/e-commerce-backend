import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
   user: {type:mongoose.Schema.Types.ObjectId, ref:'user', required:true},
    orderItems:[
        {
            name: {type:String, required:true},
            qty: {type: Number, required:true},
            price: {type: Number, required:true},
            
        }
    ],
    shipping:{
        adress: { type: String, required: true },
        city: { type: String, required: true },
        postalCode: { type: String, required: true },
        country: { type: String, required: true },
    },
    paymentMethod: { type: String, required: true, default:'paypal' },
    paymentResult: {
        id: String,
        status: String,
        update_time: String,
        email_address: String,
      },
      isPaid: { type: Boolean, default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, default: false },
    deliveredAt: { type: Date },
   //price: {type: Number, required:true},
    deliveryPrice: {type: Number, required:true},
    totalPrice: {type: Number, required:true}
})

const orderModel = mongoose.model('order', orderSchema);

export default orderModel;
