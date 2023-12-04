import express from "express";
import routerMain from "./src/router/main.js";
import { Server } from "socket.io";

const PORT = 5500;
const app = express(); 

routerMain(app); //Recivimos la plantilla base donde se encuentran los routers.

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
const io = new Server(httpServer); //Instanciar websocket

const products = [];

io.on('connection', function(socket){ //El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 
    
    socket.on("product_form", function(data){
        products.push(data);
        socket.emit("product_list", products);
    });
});
