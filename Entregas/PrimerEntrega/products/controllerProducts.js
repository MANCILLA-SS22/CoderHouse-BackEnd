import { Router } from "express";
import ProductManager from "../classManagers/ProductManager.js";

const routerProducts = Router();
const Product = new ProductManager("./products.json");

routerProducts.get("/", async function(request, response){
    const allProducts = await Product.getProducts();
    const {limit} = request.query;
    
    limit ? response.json(Object.values(allProducts).slice(0, limit)) : response.json(allProducts);
});

routerProducts.get("/:id", async function(request, response){
    const {id} = request.params;
    const allProducts = await Product.getProducts();

    const maxValue = Object.values(allProducts).length;
    if (+id < +maxValue && +id > 0) {
        const getProductId = Product.getProductById(+id);
        response.status(200).json({message: getProductId});
    } else {
        response.status(404).json({message: "User not found"});
    }
});

routerProducts.post("/", async function(request, response){
    const {title, description, price, thumbnail, code, stock, status} = request.body;
    const nuevoProducto = {
        title: title,
        description: description,
        price: price,
        thumbnail: thumbnail,
        code: code,
        stock: stock,
        status: status
    }

    // const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);

    const crearProducto = await Product.addProduct(nuevoProducto);
    response.json({message: crearProducto});
    


});

export default routerProducts;

