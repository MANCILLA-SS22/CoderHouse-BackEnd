import { Router, query } from "express";
import CartManager from "../classManagers/CartManager.js";
import ProductManager from "../classManagers/ProductManager.js";

const routerCarts = Router();

const ProductJSON = new ProductManager("./data/products.json");
const CartJSON = new CartManager("./data/carts.json");

routerCarts.get("/", async function(request, response){
    const allCarts = await CartJSON.getCart();
    const {limit} = request.query;
    
    limit ? response.json(Object.values(allCarts).slice(0, limit)) : response.json(allCarts);
});

routerCarts.post("/", async function(request, response){
    try {
        const cart = {}
        const createdCart = await CartJSON.addCart(cart);
        response.json({mesagge: createdCart});
    } 
    catch (error) {
        response.status(500).json({mesagge: "Server error"});
    }
});

routerCarts.get("/:id", function(request, response){
    const {id} = request.params;
    console.log(id)
    const getId = CartJSON.getCartById(+id);
    if (!getId) {
        response.status(404).json({message: "Cart not found"});
    }else{
        const carrito = {
            id: +id,
            products: getId.products
        }
        response.status(200).json(carrito);
    }
});

//http://localhost:5500/api/carts/2/products/1
routerCarts.post("/:cartId/products/:productId", async function(request, response){
    const {cartId} = request.params; console.log(cartId);
    const {productId} = request.params; console.log(productId);
    const getCartId = CartJSON.getCartById(+cartId); console.log(getCartId);
    const getProductId = ProductJSON.getProductById(+productId); console.log(getProductId);

    console.log();
    
    if (!getCartId){
        response.status(404).json({message: "Not found cart id."});
    }else{
        if (!getProductId){
            response.status(404).json({message: "Not found product id."});
        }else{
            const verificarCartProduct = getCartId.products.find(event => event.id === undefined);
            if (verificarCartProduct === undefined){
                const newObject = {
                    product: +productId,
                    quantity: 1
                }
                getCartId.products.push(newObject);
                const updateCartProducts = await CartJSON.updateCartProductsId(+cartId, getCartId.products);
                response.status(200).json(updateCartProducts);
            }else {
                let newObject = getCartId.products;                
                const productsArrayPosition = getCartId.products.findIndex(event => event.product === +productId);
                newObject[productsArrayPosition].quantity = newObject[productsArrayPosition].quantity+1;
                const updateCartProducts = await CartJSON.updateCartProductsId(+cartId, newObject);
                response.status(200).json(updateCartProducts);
                // response.status(404).json({message: "error"});
            }
        }
    }

    



});

export default routerCarts;