import { Router } from "express";
import {CartManager} from "../dao/mongoClassManager/CartManager.js";
import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";
const routerCarts = Router();
const CartJSON = new CartManager();
const ProductJSON = new ProductManager();


routerCarts.get("/", async function(request, response){
    console.log(quantity)
    const allCarts = await CartJSON.getCart();
    response.json(allCarts)
});

routerCarts.post("/", async function(request, response){ //En el endpoint POST '/' del controller cart estas creando el cart como un objeto vacío. El formato correcto debe incluir una key "products" con un array vacío.
    try {
        const cart = {product: []}
        const createdCart = await CartJSON.addCart(cart);
        response.json({mesagge: createdCart});
    } 
    catch (error) {
        response.status(500).json({mesagge: "Server error"});
    }
});

routerCarts.get("/:id", function(request, response){
    const {id} = request.params;
    const getId = CartJSON.getCartById(id);
    if (!getId) {
        response.status(404).json({message: "Cart not found"});
    }else{
        response.status(200).json({message: "Cart found", getId});

        // const carrito = {
        //     id: id,
        //     products: getId.products
        // }
        // response.status(200).json({message: "Cart found", carrito});
    }
});

routerCarts.post("/:cid/products/:pid", async function(request, response){ 
    const {cid} = request.params;
    const {pid} = request.params;
    const getCartId = await CartJSON.getCartById(cid);
    const getProductId = await ProductJSON.getProductById(pid);
    let cartIdProducts = getCartId?.products;

    if (!getCartId){
        response.status(404).json({message: "Not found cart id."});
    }else{
        if (!getProductId){
            response.status(404).json({message: "Not found product id."});
        }else{
            const verificarCartProduct = cartIdProducts.find(event => event.product.toHexString() === pid);
            if (verificarCartProduct === undefined){
                const newObject = {
                    product: pid,
                    quantity: 1
                }
                // cartIdProducts.push(getProductId, newObject);
                cartIdProducts.push(newObject);
                const updateCartProducts = await CartJSON.updateCartProductsId(cid, cartIdProducts);
                response.status(200).json(updateCartProducts);
            }else{
                const productsArrayPosition = cartIdProducts.findIndex(event => event.product.toHexString() === pid);
                cartIdProducts[productsArrayPosition].quantity += 1;

                const updateCartProducts = await CartJSON.updateCartProductsId(cid, cartIdProducts);
                response.status(200).json(updateCartProducts);
            }
        }
    }
});

routerCarts.delete("/:cid/products/:pid", async function(requset, response){ //deberá eliminar del carrito el producto seleccionado.
    const {cid} = requset.params;
    const {pid} = requset.params;
    const getCartId = await CartJSON.getCartById(cid);

    const verify = getCartId.products.find(event => event.product.toHexString() === pid);

    if(verify){
        const productPosition = getCartId.products.findIndex(event => event.product.toHexString() === pid); //Buscamos la posicion del producto a eliminar
        getCartId.products.splice(productPosition, 1) //Una vez encontrado, eliminamos el producto (con la posicion obtenida)
        const newArray = getCartId.products;
        const deleteProduct = await CartJSON.deleteProductInCarById(cid, newArray);
        response.status(200).json({messaje: deleteProduct})

    }else{
        response.status(404).json({messaje: "Product not found"});
    }
});


routerCarts.put("/:cid", async function(requset, response){ //  deberá actualizar el carrito con un arreglo de productos con el formato especificado arriba.

});

routerCarts.put("/:cid/products/:pid", async function(requset, response){ //deberá poder actualizar SÓLO la cantidad de ejemplares del producto por cualquier cantidad pasada desde req.body

});

routerCarts.delete("/:cid", async function(requset, response){ //deberá eliminar todos los productos del carrito

});

export default routerCarts;