import express from "express";
import {__dirname} from "./utils.js";
import handlebars from "express-handlebars";
import routerMain from "./src/router/main.js";
import { Server } from "socket.io";

const PORT = 5500;
const app = express(); 

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("hbs", handlebars.engine({// Inicializamos el motor con app.engine, para indicar que motor usaremos. En este caso, handlebars.engine
        extname: "hbs", //index.hbs
        defaultLayout: "main", //Plantilla principal
    })
);

app.set("views", `${__dirname}/src/view`); // Seteamos nuestro motor. Con app.set("views", ruta) indicamos en que parte del proyecto estaran las vistas. Recordar utilizar rutas absolutas para evitar asuntos de ruteo relativo.
app.set("view engine", "hbs"); //Finalmente, con este app.set() indicamos que, el motor que ya inicializamos arriba, es el que queremos utilizar. Es importante saber que, cuando digamos al servidor que renderice, sepa que tiene que hacerlo con el motor de hbs.
app.use(express.static(`${__dirname}/src/public`)); // Public. Sentamos de manera estatica la carpeta public


routerMain(app); //Recivimos la plantilla base donde se encuentran los routers.

const httpServer = app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
global.io = new Server(httpServer); //Instanciar websocket

io.on('connection', function(socket){ //El cliente se conecta con su websocket al io (io.on significa que está escuchando porque algo pase), entonces, cuando io escucha que hay una nueva conexión (connection), muestra en consola el mensaje “Nuevo cliente conectado”. Es por eso que aparece el mensaje en la consola del Visual Studio Code. 
    socket.on("connect",function(data){
        console.log(data);
    });

    socket.on("disconect",function(){
        console.log("Socket disconected")
    });
});

// - Paso 1: Debemos crear los produtos que se encuentran en ProductManager. En este archivo hasta el final se encuentran los objetos que serviran 
// para copiar y pegar en postman y asi crear los productos en un archivo products.json
// - Paso 2: El siguiente metodo es crear el o los carritos deseados, los cuales contendran un arreglo "products" vacio y un id. Es importante crearlos
// antes de introducir los productos al carrito o de lo contrario obtendremos un error.
// - Paso 3: Finalmente podemos agregar elementos al arreglo products en el archivo carts.json.