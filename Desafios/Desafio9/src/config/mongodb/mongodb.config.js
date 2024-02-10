import { MONGO_URL } from "../dotenvMain/env.config.js";
import mongoose from "mongoose";
// import MongoStore from "connect-mongo";
// import session from "express-session";

function mongoConfig(){
    async function connectMongo(){
        try {
            console.log("DB connected")
            await mongoose.connect(MONGO_URL)
        } catch (error) {
            console.log(error);
            process.exit();
        }
    }
    connectMongo();

    // app.use(session ({ //Descomentar linea si se trabaja con "sessions". Comentar si se trabaja con JWT
    //     store: MongoStore.create({
    //         mongoUrl: MONGO_URL, 
    //         mongoOptions: {useNewUrlParser: true, useUnifiedTopology: true},
    //         ttl: 10*60,
    //     }),
    //     secret: secretKey,
    //     resave: false, //Lo guarda en memoria. Esto permite mantener la sesion activa en caso de que la sesion se mantenga inactiva. Si se deja en false, la sesion morira en caso de que exista cierto tiempo de inactividad.
    //     saveUninitialized: true // Lo guarda apenas se crea la sesion. Permite guardar cualquier sesion aun cuando el objeto de sesion no tenga nada por contener. Si se deja en false, la sesion no se guardara si el objeto de sesion esta vacio al final de la consulta.
    // }));    
}

export default mongoConfig;