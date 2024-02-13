import { Router } from "express";
import {
  editarPosteo,
  eliminarPosteo,
  nuevoPosteo,
  obtenerPosteoDelUsuarioAutenticado,
  obtenerPosteosDelUsuarioAutenticado,
  obtenerPosteosDeTodosLosUsuarios,
} from "../controllers/posteo-controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const PosteoRouter = Router();

PosteoRouter.get("/no-auth", obtenerPosteosDeTodosLosUsuarios);

PosteoRouter.route("/:posteoId")
  .get(checkAuth, obtenerPosteoDelUsuarioAutenticado)
  .patch(checkAuth, editarPosteo)
  .delete(checkAuth, eliminarPosteo);
PosteoRouter.route("/")
  .get(checkAuth, obtenerPosteosDelUsuarioAutenticado)
  .post(checkAuth, nuevoPosteo);

export { PosteoRouter };
