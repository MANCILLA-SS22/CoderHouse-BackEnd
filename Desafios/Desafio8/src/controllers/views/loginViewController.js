import { Router } from 'express';
import { ProductManager } from '../../dao/mongoClassManager/ProductManager.js';
import { authToken, passportCall, authorization } from "../../utils.js";
import passport from 'passport';

const router = Router();
const productManager = new ProductManager();

function logger(req, res, next){
    if (req.session.user){
        return res.redirect("/api/products");
    }else{
        next();
    }
}

router.get("/login", logger, function(req, res){
    res.render('login')
});

router.get("/register", logger, function(req, res){
    res.render('register')
});

// router.get("/", async function(req, res){ //Este se usa con sessions
//     try {
//         const allProducts = await productManager.getProducts();
//         console.log("allProducts", allProducts)
//         res.render('profile', {fileCss: "styles.css", data: allProducts, user: req.session.user});
//     } catch (error) {
//         res.status(500).json({message: {error}})
//     }    
// });


// Metodo 0: Usando Authorization Bearer Token
// router.get("/", function(req, res){
//     res.render('profile', {user: req.user});
// });
// router.get("/:userId", authToken, async function(req, res){
//     const userId = req.params.userId;  console.log("URL id", userId);
//     try {
//         const user = await productManager.findUser({userId});    
//         console.log("User", user);
//         if (!user) res.status(202).json({message: "User not found with ID: " + userId});
//         res.json(user);
//     } catch (error) {
//         console.error("Error consultando el usuario con ID: " + userId);
//     }
// });

// Metodo 1: Usando Authorization Bearer Token (USAR POSTMAN O NO FUNCIONARA)
// router.get("/", authToken, function(req, res){
//     res.render('profile', {user: req.user});
// });

//Metodo 2: Usando JWT por Cookie
router.get("/", passport.authenticate('jwt', { session: false }), async function(req, res){  //Colocamos session:false debido a que no ocupamos express-session para estos procesos.
    const allProducts = await productManager.getProducts();
    console.log("allProducts", allProducts)
    res.render('profile', {user: req.user, data: allProducts});
});

//Metodo 3: Usando passport-JWT por Cookie mediante customCall
// router.get("/", passportCall('jwt'), function(req, res){ 
//     res.render('profile', {user: req.user});
// });

// //Metodo 4
// router.get("/", authorization('admin'), function(req, res){ 
//     res.render('profile', {user: req.user});
// });

export default router;