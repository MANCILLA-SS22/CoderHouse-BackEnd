import {Schema, model} from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2"

const productShema = new Schema({
    title: String,
    description: String,
    price: {type: Number, index: true},
    thumbnail: Array,
    code: String,
    stock: Number,
    status: String,
    category: String,
    id: Number
});

productShema.plugin(mongoosePaginate)
const productModel = model("products", productShema);
export default productModel;

/* 
http://localhost:5500/api/products?page=1&limit=8&sort=asc&stock=3&category=New
*/