import routerCarts from "../carts/controllerCarts.js";
import routerProducts from "../products/controllerProducts.js";
import realTimeProductsController from "../router/controllerRealProducts.js";

function routerMain(app){

    function inicio(request, response){
        response.render("index", {
            title: "Ejercicio",
            name: "German",
            fileCss: "styles.css",
        });
    }
        
    app.get("/", inicio);
    app.use("/api/products/", routerProducts);
    app.use("/api/carts", routerCarts);
    app.use("/realTimeProducts", realTimeProductsController);
}

export default routerMain;