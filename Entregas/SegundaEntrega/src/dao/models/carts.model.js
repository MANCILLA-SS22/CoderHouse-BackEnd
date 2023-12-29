import {Schema, model} from "mongoose";

const productShema = new Schema({
    products: {
        type: [
            {
                product: { 
                    type: Schema.Types.ObjectId,
                    ref: "products"
                },
                quantity: Number
            }
        ],
        default: []
    }

    // products: { 
    //     type: Schema.Types.ObjectId 
    // },
    // quantity: Number

});

const cartModel = model("carts", productShema);

export {cartModel};