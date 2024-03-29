import { MongoSingleton } from '../config/mongodb/mongodb-singleton.js';
import { PERSISTENCE } from '../config/dotenvMain/env.config.js';

let productService;
let cartService;

async function initializeMongoService() {
    try {
        console.log("Iniciando Servicio para Mongo!!");
        await MongoSingleton.getInstance();
    } catch (error) {
        console.error("Error al iniciar MongoDB:", error);
        process.exit(1); // Salir con código de error
    }
}

switch (PERSISTENCE) {
    case 'mongodb':  
        initializeMongoService();
        const { ProductManager } = await import('./dao/services/product.service.js');
        productService = new ProductManager;   // console.log("Servicio de productos cargado: ", productService);

        const { CartManager } = await import('./dao/services/cart.service.js');
        cartService = new CartManager;   // console.log("Servicio de carritos cargado: ", cartService);
        break;

    case 'file':
        const { default: cartServiceFileSystem } = await import('./dao/filesystem/productsManager/ProductManager.js');
        productService = new cartServiceFileSystem;  // console.log("Servicio de productos cargado: ", productService);

        const { default: CoursesServiceFileSystem } = await import('./dao/filesystem/cartsManager/CartManager.js');
        cartService = new CoursesServiceFileSystem;  // console.log("Servicio de carritos cargado: ", cartService);
        break;

    default:
        console.error("Persistencia no válida en la configuración:", PERSISTENCE);
        process.exit(1); // Salir con código de error
}

export { productService, cartService };