//Implementación de login --> Ajustar nuestro servidor principal para trabajar con un sistema de login
// ✓ Deberá contar con todas las vistas realizadas en el hands on lab, así también como las rutas de router para procesar el registro y el login.
// ✓ Una vez completado el login, realizar la redirección directamente a la vista de productos.
// ✓ Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario
// ✓ Agregar un sistema de roles, de manera que si colocamos en el login como correo adminCoder@coder.com, y la contraseña adminCod3r123, el usuario de la sesión además tenga un campo
// ✓ Todos los usuarios que no sean admin deberán contar con un rol “usuario”.
// ✓ Implementar botón de “logout” para destruir la sesión y redirigir a la vista de login

import express from "express";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";

const app = express();

routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
mongoConfig(app);
app.listen(5500, () => console.log(`Server listening on port ${5500}`));


//Seccion de codigo para trabajar con el chat de websockets (referente a entregas pasadas)
/* import {app, express, httpServer} from "./socket/socketConfig.js";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";

// const httpServer = http.createServer(app); 

routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
mongoConfig();
import {PORT} from "./env.js"; */