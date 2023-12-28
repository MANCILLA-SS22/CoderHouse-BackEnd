import { Router } from "express";
const routerProducts = Router();

import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";
const ProductJSON = new ProductManager();

let res;

routerProducts.get("/", async function(request, response){
    try {
        let limit;
        let page;
        let filter;
        let sort;
        let prevSort;
        let link = request.protocol+"://"+request.get("host")+request.originalUrl; //Obtenemos el link original
        let nextLink;
        let prevLink;

        request.query.limit === undefined ? limit = 10 : limit = request.query.limit;
        request.query.page === undefined ? page = 1 : page = request.query.page;
        
        if(request.query.category === undefined && request.query.stock === undefined){
            filter = {};
        }else if(request.query.category === undefined && request.query.stock !== undefined){
            filter = { stock: {$gte: request.query.stock} };
        }else if(request.query.category !== undefined && request.query.stock === undefined){
            filter = { category: {$regex: request.query.category} };
        }else{
            filter = { stock: {$gte: request.query.stock} };         //$gte --> Matches values that are greater than or equal to a specified value.
            filter = { category: {$regex: request.query.category} }; //$regex --> Selects documents where values match a specified regular expression.
        }

        if(request.query.category === "asc"){
            prevSort = "asc";
            sort = 1;
        }else if(request.query.category === "desc"){
            prevSort = "desc";
            sort = -1;
        }else{
            sort = undefined;
        }

        let conditionalQuery = {
            page: page,
            limit: limit,
            sort: {price: sort}
        }

        const products = await ProductJSON.getProducts(filter, conditionalQuery); // Model.paginate([query], [options], [callback])
        products.hasPrevPage === false ? prevLink = null : prevLink = request.protocol + '://' + request.get('host') + '/api/products' + "?"+ `page=${products.prevPage}`+ `$limit=${limit}&sort=${prevSort}`;
        products.hasNextPage === false ? nextLink = null : nextLink = request.protocol + '://' + request.get('host') + '/api/products' + "?"+ `page=${products.nextPage}`+ `$limit=${limit}&sort=${prevSort}`;

        res = {
            status: "success",                 //success/error
            payload: products.docs,            //Resultado de los productos solicitados
            totalPages: products.totalPages,   //Total de páginas
            prevPage: products.prevPage,       //Página anterior
            nextPage: products.hasNextPage,    //Página siguiente
            page: products.page,               //Página actual
            hasPrevPage: products.hasPrevPage, //Indicador para saber si la página previa existe
            hasNextPage: products.hasNextPage, //Indicador para saber si la página siguiente existe.
            prevLink: prevLink,                //Link directo a la página previa (null si hasPrevPage=false)   
            nextLink: nextLink,                //Link directo a la página siguiente (null si hasNextPage=false)
            link: link
        };

        console.log(prevLink)

        const allProducts = await ProductJSON.getProducts();    
        response.json(allProducts);

    } catch (error) {
        response.status(500).json({ mesagge: { error } });
    }    

    // const allProducts = await ProductJSON.getProducts();    
    // response.json(allProducts);

});

routerProducts.get("/:id", async function(request, response){
    try {
        const {id} = request.params;
        const getById = await Product.getProductById(id);
        response.status(200).json({getById, message: "User found"});
    } catch (error) {
        response.status(404).json({message: "User NOT found", error});
    }
    
});

routerProducts.post("/", async function(request, response){
    const {title, description, price, thumbnail, code, stock, status, category} = request.body;
    const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}

    // const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
    const parametersExist = nuevoProducto.hasOwnProperty("title") && nuevoProducto.hasOwnProperty("description") && nuevoProducto.hasOwnProperty("price") && nuevoProducto.hasOwnProperty("thumbnail") && nuevoProducto.hasOwnProperty("code") && nuevoProducto.hasOwnProperty("stock") && nuevoProducto.hasOwnProperty("status") && nuevoProducto.hasOwnProperty("category");
    if (parametersExist) {
        const crearProducto = await ProductJSON.addProduct(nuevoProducto);
        // const allProducts = await Product.addProduct();

        if(crearProducto?.error) {
            response.status(409).json({error: crearProducto.error})
            return;
        }
        response.status(200).json({message: {crearProducto}});
    
    }else{
        response.status(404).json({message: "Not enough information."});
    }
});

routerProducts.put("/:id", async function(request, response){
    const {id} = request.params;
    const {title, description, price, thumbnail, code, stock, status} = request.body;
    const nuevoProducto = {title, description, price, thumbnail, code, stock, status, category}

    const verificarId = Product.getProductById(id);
    if(!verificarId){
        response.status(404).json({message: "Not found id."});
    }else{
        const verifyExistenceUndefined = Object.values(nuevoProducto).indexOf(undefined);
        if (verifyExistenceUndefined === -1) {
            const actualizarProducto = await Product.updateProduct(id, nuevoProducto);
            response.status(200).json({message: actualizarProducto});
        }else{
            response.status(404).json({message: "Not enough information."});
        }
    }
});

routerProducts.delete("/:id", async function(request, response){
    try {
        const {id} = request.params;
        const verificarId = await Product.getProductById(id);
        if(!verificarId){
            response.status(404).json({message: "Not found id."});
        }else{
            const eliminarProducto = await Product.deleteProduct(id);
            response.status(200).json({message: eliminarProducto});
        }
    } catch (error) {
        response.status(404).json({message: "id NOT found", error});
    }
});

export {routerProducts, res};