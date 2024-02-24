// ✓ Modificar nuestra capa de persistencia para aplicar los conceptos de Factory (opcional), DAO y DTO.
// ✓ El DAO seleccionado (por un parámetro en línea de comandos como lo hicimos anteriormente) será devuelto por una Factory para que la capa de negocio opere con él. (Factory puede ser opcional)
// ✓ Implementar el patrón Repository para trabajar con el DAO en la lógica de negocio.

import { PORT } from "./config/dotenvMain/env.config.js";
import {app, httpServer, express} from "./socket/socketServer.js";
import program from "./process.js";
import routerMain from "./router/classMain.routes.js";  
import mongoConfig from "./config/mongodb/mongodb.config.js";
import handlebarsConfig from "./config/handlebars/handlebars.config.js";
import passportConfig from "./config/passport/passport.config.js";
import middlewares from "./config/middlewares/middlewares.config.js";

mongoConfig(app);
passportConfig(app);
middlewares(app, express);
routerMain(app);
handlebarsConfig(app);

httpServer.listen(PORT, () => console.log(`Server listening on ${PORT}`));


/* import express from "express";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";

const app = express();
mongoConfig(app);
routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
app.listen(5500, () => console.log(`Server listening on port ${5500}`)); */
