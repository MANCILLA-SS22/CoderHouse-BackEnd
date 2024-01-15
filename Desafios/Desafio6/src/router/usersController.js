import { Router } from "express";
import { UserManager } from "../dao/mongoClassManager/UserManager.js";
import { userModel } from "../dao/models/user.model.js";

const router = Router();
const userDB = new UserManager();

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email, password }); //Ya que el password no está hasheado, podemos buscarlo directamente

    if (!user) return res.status(401).send({ status: 'error', error: "Incorrect credentials" })

    req.session.user = {
        name: `${user.first_name} ${user.last_name}`,
        email: user.email,
        age: user.age
    }

    res.send({ status: "success", payload: req.session.user, message: "¡Primer logueo realizado! :)" });
})

router.post('/register', async function(req, res){
    try {
        const { first_name, last_name, email, age, password } = req.body;
        // console.log("Registrando usuario:", req.body);
    
        const user = {
            first_name: first_name,
            last_name: last_name, 
            email: email,
            age: age,
            password: password
        }
    
        const result = await userDB.createUser(user);
        res.status(201).json({data: result})
        // res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id });
    } catch (error) {
        return res.status(400).send({status: "error", msg: "Usuario existente!"});
    }
});

router.get("/logout", function(req, res){
    req.session.destroy(function(error){
        if(error){
            res.json({error: "Error logout", msg: "Error al cerrar la sesion"});
        }
        res.redirect("/login");
    })
});

export default router;