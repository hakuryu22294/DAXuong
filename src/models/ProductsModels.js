import mongoose from 'mongoose';
const productsSchema = new mongoose.Schema(
    {
    name: {type:String, required: true},
    image: {type:String, required: true},
    type : {type:String, required: true},
    price: {type:Number,required: true},
    countInStock :{type:Number, required: true},
    rating: {type:Number, required: true},
    description:  {type:String, required: true}
    },
    {
        timestamps: true
    }
)

const Products = mongoose.model('User', productsSchema);
module.exports = Products;