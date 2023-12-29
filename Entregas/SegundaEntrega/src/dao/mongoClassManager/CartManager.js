import {cartModel} from "../models/carts.model.js";

export class CartManager{

    async getCart(){
        try {
            return await cartModel.find();
        } catch (error) {
            return error;
        }
    }

    async addCart(cart){
        try {
            const newProduct = await cartModel.create(cart);
            return "Cart added successfully";
        } catch (error) {
            console.log(error);
        }
    }    

    async getCartById(id){
        try {
            return await cartModel.findById(id);
        } catch (error) {
            return error
        }
    }

    async updateCartProductsId(id, array) {
        try {
            return await cartModel.findByIdAndUpdate(id, {products: array});
        }
        catch (error) {
            return error;
        }
    }

    async deleteProductInCarById(id, newArrayProducts){
        try {
            const deleteProduct = await cartModel.findByIdAndUpdate(id, {products: newArrayProducts});
            return "Product deleted from cart"
        } catch (error) {
            
        }
    }

    async updateCartByProductsId(cartId, updateNumberOfProducts){
        try {
            return await cartModel.findByIdAndUpdate(cartId, updateNumberOfProducts);
        } catch (error) {
            return error
        }
    }

    async updateOneCart(id, arrayProducts){
        try {
            const cart = await cartModel.findById(id);
            cart.products = products;
            const res = await cartModel.findByIdAndUpdate(id, cart);
            return res;
        } catch (error) {
            
        }
    }

    async deleteProductsById(id){
        try {
            return await cartModel.findByIdAndDelete(id);
        } catch (error) {
            
        }
    }



    async cartFindById(cartId){
        try {
            return await cartModel.findById(cartId);
        } catch (error) {
            return error
        }
    }
}

