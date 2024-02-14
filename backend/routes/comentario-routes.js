import { Router } from "express";
import {
  editarComentario,
  eliminarComentario,
  nuevoComentario,
} from "../controllers/comentario-controllers.js";
import { checkAuth } from "../middleware/checkAuth.js";

const ComentarioRouter = Router();

ComentarioRouter.post("/:posteoId", checkAuth, nuevoComentario);
ComentarioRouter.route("/:comentarioId")
  .patch(checkAuth, editarComentario)
  .delete(checkAuth, eliminarComentario);

export { ComentarioRouter };
