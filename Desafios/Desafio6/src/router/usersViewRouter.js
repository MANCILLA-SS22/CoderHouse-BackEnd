import { Router } from 'express';

const router = Router();

// function publicAccess(req, res, next){
//     if (req.session.user === true){
//         return res.redirect("/api/products");
//     }else{
//         next();
//     }
// }

router.get("/login", function(req, res){
    res.render('login')
});

router.get("/register", function(req, res){
    res.render('register')
});

router.get("/", function(req, res){
    res.render('profile', {user: req.session.user});
});

export default router;