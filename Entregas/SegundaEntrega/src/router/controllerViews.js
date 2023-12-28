import { Router } from "express";
import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";
import { res } from "./controllerProducts.js";
const router = Router();

const Product = new ProductManager();
const allProducts = Product.getProducts();

router.get("/", async function(request, response){
    try {
        const allProducts = await Product.getProducts();
        response.render("home", {fileCss: "styles.css", data: allProducts});
    } catch (error) {
        response.status(500).json({message: {error}})
    }
});

router.get("/products", async function(request, response){
    try {
        response.status(200).render('products', {res}); 
    } catch (error) {
        response.status(500).json({message: {error}})
    }
});

router.get("/api/products/:id", async function(request, response){
    const {id} = request.params;
    try {
        const getById = await Product.getProductById(id);
        response.status(200).render('productInfo', getById); 
    } catch (error) {
        response.status(500).json({message: {error}})
    }
});



router.get("/realTimeProduct", function(request, response){
    response.render("realTimeProducts", {title: "Form example",fileCss: "styles.css", allProducts})
});

router.get("/chat", function(request, response){
    response.render("chat", {title: "Form example",fileCss: "styles.css"})
});

export default router;