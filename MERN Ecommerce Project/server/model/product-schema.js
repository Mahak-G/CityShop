import mongoose from "mongoose"; //for mongoose data save
const productSchema = new mongoose.Schema({
    id:{
        type:String,
        required: true,
        unique: true
    },
    url: String,
    detailUrl:String,
    shortTitle:String,
    longTitle:String,
    mrp:Number,
    cost:Number,
    discount:String,
    quantity:Number,
    description: String,
    discount_tag: String,
    tagline:String
});

const products= mongoose.model('product',productSchema);
export default products;

