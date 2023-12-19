import express from "express";
import { Server } from "socket.io";
import http from "http"
import {ProductManager} from "../dao/mongoClassManager/ProductManager.js";

const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer);  

const Product = new ProductManager(); //Persistencia de archivos: El almacenamiento persistente se refiere a la retención de datos de forma no volátil, de modo que sigan estando disponibles incluso después de que un dispositivo o aplicación se apague o reinicie
const getProducts = Product.getProducts();

io.on('connection', async function (socket) {
	socket.emit('product_list', await getProducts); // Se envian los products al momento que se conecta un cliente
	socket.on('product_form', async function (data) {
		Product.addProduct(data);
		io.emit('product_list', await getProducts); // Utiliza io.emit para enviar los productos actualizados a todos los clientes.
	});




});

export {app, express, httpServer, io};