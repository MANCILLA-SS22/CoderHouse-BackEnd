import Route from "../../router/class.routes.js";
import { ProductManager } from '../../dao/mongoClassManager/ProductManager.js';
import { authToken, passportCall, authorization } from "../../utils.js";
import passport from 'passport';

const productManager = new ProductManager();

function logger(req, res, next){
    console.log("Has entrado a este middleware")
    if (req.cookies.jwtCookieToken){
        return res.redirect("/api/products");
    }else{
        next();
    }
}

function init(req, res, next){
    console.log("Has entrado a este middleware")
    if (!req.cookies.jwtCookieToken){
        return res.redirect("/login");
    }else{
        next();
    }
}

class LoginRegister extends Route {        
        init(){

        //Metodo 2: Usando JWT por Cookie
        this.get("/", ['PUBLIC'], init, passport.authenticate('jwt', { session: false }), async function(req, res){  //Colocamos session:false debido a que no ocupamos express-session para estos procesos.
            console.log("Res")
            const allProducts = await productManager.getProducts();
            res.render('profile', {user: req.user, data: allProducts});
        });

        this.get("/login", ['PUBLIC'], logger, function(req, res){
            res.render('login')
        });
        
        this.get("/register", ['PUBLIC'], function(req, res){
            res.render('register');
        });  
        
        this.get("/chat", ['USER'], function(req, res){
            try {
                res.render("chat");
            } catch (error) {
                res.status(500).send({ error: "Error consultando el chat", message: error });
            }
        });   

        this.get("/github/login", ['USER'], function(req, res){
            res.render("github-login");
        });
        
        this.get("/github/error", ['USER'], function(req, res){
            res.render("error", { error: "No se pudo autenticar usando GitHub!" });
        });


        /* // Metodo 1: Usando Authorization Bearer Token (USAR POSTMAN O NO FUNCIONARA)
        // this.get("/", ['PUBLIC'], authToken, function(req, res){
        //     res.render('profile', {user: req.user});
        // });

        //Metodo 3: Usando passport-JWT por Cookie mediante customCall
        // this.get("/", ['PUBLIC'], passportCall('jwt'), function(req, res){ 
        //     res.render('profile', {user: req.user, data: allProducts});
        // });

        // //Metodo 4
        // this.get("/", ['PUBLIC'], authorization('admin'), function(req, res){ 
        //     res.render('profile', {user: req.user});
        // });    */ 
    }
}

export default LoginRegister;