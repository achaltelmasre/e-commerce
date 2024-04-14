import { Schema, model } from "mongoose";

const productSchema = new Schema({
  name: {
    type:String,
    required: true,
  },
  description: {
    type:String, 
    require: true,
  },
  price: {
    type:Number,
    required: true,
  },
  image: {
    type:String,
    required: true,
  },
  category: {
    type:String,
  },
  brand:{
    type:String,
  }
},
{
    timestamps: true,
});

const Product = model('Product', productSchema);

export default Product;