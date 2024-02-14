import Posteo from "../models/Posteo.js";
import Comentario from "../models/Comentario.js";

// ----------------------------------------------------------------

const editarPosteo = async (req, res) => {
  const { usuario } = req;
  const { posteoId } = req.params;

  // Verificamos que exista un posteo con ese id
  const posteo = await Posteo.findById({ _id: posteoId });
  if (!posteo) {
    const error = new Error("Posteo no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Si existe el posteo, verificamos que el author de dicho posteo, sea igual al id del usuario autenticado
  const verificarSiElAutorDelPosteoNoEsElUsuarioLogueado =
    posteo.author.toString() !== usuario._id.toString();
  if (verificarSiElAutorDelPosteoNoEsElUsuarioLogueado) {
    const error = new Error("Acción no valida");
    return res.status(401).json({ msg: error.message });
  }

  posteo.title = req.body.title || posteo.title;
  posteo.description = req.body.description || posteo.description;

  try {
    await posteo.save();

    // res.status(200).json({ msg: "Posteo actualizado correctamente" });
    res.status(200).json(posteo);
  } catch (error) {
    console.error(error);
  }
};

// ----------------------------------------------------------------

const eliminarPosteo = async (req, res) => {
  const { usuario } = req;
  const { posteoId } = req.params;

  // Verificamos que exista un posteo con ese id
  const posteo = await Posteo.findById({ _id: posteoId });
  if (!posteo) {
    const error = new Error("Posteo no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Si existe el posteo, verificamos que el author de dicho posteo, sea igual al id del usuario autenticado
  const verificarSiElAutorDelPosteoNoEsElUsuarioLogueado =
    posteo.author.toString() !== usuario._id.toString();
  if (verificarSiElAutorDelPosteoNoEsElUsuarioLogueado) {
    const error = new Error("Acción no valida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    // Elimino todos los comentarios del modelo de Comentario, que estén en el campo de "comments" del posteo a eliminar
    await Comentario.deleteMany({ _id: { $in: posteo.comments } });

    await posteo.deleteOne();

    res.status(200).json({ msg: "Posteo eliminado correctamente" });
  } catch (error) {
    console.error(error);
  }
};

// ----------------------------------------------------------------

const nuevoPosteo = async (req, res) => {
  const { usuario } = req;
  const { title, description } = req.body;

  try {
    const posteo = new Posteo({
      title,
      description,
    });
    posteo.author = usuario._id;

    await posteo.save();

    // res.status(201).json({ msg: "Posteo creado correctamente" });
    res.status(201).json(posteo);
  } catch (error) {
    console.error(error);
  }
};

// ----------------------------------------------------------------

const obtenerPosteoDelUsuarioAutenticado = async (req, res) => {
  const { usuario } = req;
  const { posteoId } = req.params;

  // Verificamos que exista un posteo con ese id
  const posteo = await Posteo.findById({ _id: posteoId }).populate(
    "comments",
    "-__v"
  );
  if (!posteo) {
    const error = new Error("Posteo no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Si existe el posteo, verificamos que el author de dicho posteo, sea igual al id del usuario autenticado
  const verificarSiElAutorDelPosteoNoEsElUsuarioLogueado =
    posteo.author.toString() !== usuario._id.toString();
  if (verificarSiElAutorDelPosteoNoEsElUsuarioLogueado) {
    const error = new Error("Acción no valida");
    return res.status(401).json({ msg: error.message });
  }

  res.status(200).json(posteo);
};

// ----------------------------------------------------------------

const obtenerPosteosDelUsuarioAutenticado = async (req, res) => {
  const { usuario } = req;

  try {
    const posteos = await Posteo.find()
      .where("author")
      .equals(usuario._id)
      .populate("comments", "-__v");

    res.status(200).json(posteos);
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

const obtenerPosteosDeTodosLosUsuarios = async (req, res) => {
  try {
    const posteos = await Posteo.find().populate("comments", "-__v");
    res.status(200).send(posteos);
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

export {
  editarPosteo,
  eliminarPosteo,
  nuevoPosteo,
  obtenerPosteoDelUsuarioAutenticado,
  obtenerPosteosDelUsuarioAutenticado,
  obtenerPosteosDeTodosLosUsuarios,
};
