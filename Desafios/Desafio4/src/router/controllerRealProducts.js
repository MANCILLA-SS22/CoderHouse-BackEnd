import ProductManager from "../classManagers/ProductManager.js";
import { Router } from "express";

const router = Router();
const Product = new ProductManager("src/data/products.json");


router.get("/", function(request, response){
    const allProducts = Product.getProducts();
    global.io.emit("productList", allProducts);
    response.render("realTimeProducts", {allProducts})
})

export default router;