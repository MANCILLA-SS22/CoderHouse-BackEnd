import {routerCarts} from "../controllers/carts/controllerCarts.js";
import {routerProducts} from "../controllers/products/controllerProducts.js";

import controllerViews from "../controllers/views/controllerViews.js"
import realTimeProductsController from "../controllers/realTimeProducts/controllerRealProducts.js";
import chatController from "../controllers/chat/controllerChat.js";

import login from "../controllers/views/loginViewController.js";
import authController from "../controllers/users/usersController.js";
import sessionsController from "../controllers/sessions/sessionsController.js"
import githubLoginViewRouter from "./github-login.views.routes.js"

function routerMain(app){
    app.use(controllerViews);

    app.use("/chat", chatController);
    app.use("/realTimeProduct", realTimeProductsController);
    
    app.use("/api/carts", routerCarts);
    app.use("/api/products", routerProducts);   
    
    app.use("/", login);    
    app.use("/api/auth", authController);
    app.use("/api/sessions", sessionsController);

    app.use("/github", githubLoginViewRouter);

}

export default routerMain;