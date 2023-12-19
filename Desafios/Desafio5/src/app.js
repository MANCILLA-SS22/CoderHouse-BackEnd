// ✓ Implementar una vista nueva en handlebars llamada chat.handlebars, la cual permita implementar un chat como el visto en clase. Los mensajes deberán guardarse en 
//   una colección “messages” en mongo (no es necesario implementarlo en FileSystem). El formato es: {user:correoDelUsuario, message: mensaje del usuario}
// ✓ Corroborar la integridad del proyecto para que todo funcione como lo ha hecho hasta ahora

import {app, express, httpServer} from "./socket/socketConfig.js";
import routerMain from "./router/main.js";
import mongoConfig from "./mongodb/mongodbConfig.js";
import {PORT} from "./env.js";

routerMain(app, express); //Recivimos la plantilla base donde se encuentran los routers.
mongoConfig();
httpServer.listen(PORT, () => console.log(`Server listening on port ${PORT}`));