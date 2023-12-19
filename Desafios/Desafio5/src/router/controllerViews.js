import { Router } from "express";
const router = Router();

import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";
const Product = new ProductManager();

router.get("/api/products", async function(request, response){
    try {
        const allProducts = await Product.getProducts();
        response.render("home", {fileCss: "styles.css", data: allProducts});
    } catch (error) {
        response.status(500).json({message: {error}})
    }
    
});

router.get("/realTimeProduct", function(request, response){
    response.render("realTimeProducts", {title: "Form example",fileCss: "styles.css"})
});

export default router;