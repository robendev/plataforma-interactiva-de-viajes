import { Router } from "express";
import {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
} from "../controllers/usuario-controllers.js";

const UsuarioRouter = Router();

UsuarioRouter.post("/", registrar);
UsuarioRouter.post("/login", autenticar);
UsuarioRouter.get("/confirmar/:token", confirmar);
UsuarioRouter.post("/olvide-password", olvidePassword);
UsuarioRouter.route("/olvide-password/:token")
  .get(comprobarToken)
  .post(nuevoPassword);

export { UsuarioRouter };
