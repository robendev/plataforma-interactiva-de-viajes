import Comentario from "../models/Comentario.js";
import Posteo from "../models/Posteo.js";

const editarComentario = async (req, res) => {
  const { usuario } = req;
  const { comentarioId } = req.params;
  const { description } = req.body;

  // Verificamos que exista el comentario con ese id
  const comentario = await Comentario.findById({ _id: comentarioId });
  if (!comentario) {
    const error = new Error("Comentario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Si existe el comentario en el modelo de Comentario, buscamos mediante su _id el posteo donde esta almacenado
  const posteo = await Posteo.findOne({ comments: comentario._id });
  if (!posteo) {
    const error = new Error("Posteo no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Verificamos que el _id del usuario autenticado, sea diferente al author del comentario
  const verificarSiElAutorDelComentarioNoEsElUsuarioLogueado =
    comentario.author.toString() !== usuario._id.toString();
  if (verificarSiElAutorDelComentarioNoEsElUsuarioLogueado) {
    const error = new Error("Acción no valida");
    return res.status(401).json({ msg: error.message });
  }

  comentario.description = description || comentario.description;

  try {
    // Guardamos el comentario actualizado
    await comentario.updateOne({ description }, { new: true });

    res.status(200).json({ msg: "Comentario Actualizado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

const eliminarComentario = async (req, res) => {
  const { usuario } = req;
  const { comentarioId } = req.params;

  // Verificamos que exista el comentario con ese id
  const comentario = await Comentario.findById({ _id: comentarioId });
  if (!comentario) {
    const error = new Error("Comentario no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Si existe el comentario en el modelo de Comentario, buscamos mediante su _id el posteo donde esta almacenado
  const posteo = await Posteo.findOne({ comments: comentario._id });
  if (!posteo) {
    const error = new Error("Posteo no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  // Verificamos que el _id del usuario autenticado, sea diferente al author del comentario
  const verificarSiElAutorDelComentarioNoEsElUsuarioLogueado =
    comentario.author.toString() !== usuario._id.toString();
  if (verificarSiElAutorDelComentarioNoEsElUsuarioLogueado) {
    const error = new Error("Acción no valida");
    return res.status(401).json({ msg: error.message });
  }

  try {
    // Eliminamos el comentario del modelo de Posteo
    await posteo.comments.pull({ _id: comentario._id });

    posteo.save();

    // Eliminamos el comentario del modelo de Comentario
    await comentario.deleteOne();

    res.status(200).json({ msg: "Comentario eliminado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

const nuevoComentario = async (req, res) => {
  const { usuario } = req;
  const { posteoId } = req.params;
  const { description } = req.body;

  // Verificamos que exista un posteo con ese id
  const posteo = await Posteo.findById({ _id: posteoId });
  if (!posteo) {
    const error = new Error("Posteo no encontrado");
    return res.status(404).json({ msg: error.message });
  }

  try {
    const comentario = new Comentario({
      description,
    });
    comentario.author = usuario._id;

    // Agrega el comentario al campo comments del posteo
    posteo.comments.push(comentario);

    // Guarda los cambios en el posteo
    await posteo.save();

    // Guarda el nuevo comentario
    await comentario.save();

    res.status(200).json({ msg: "Comentario creado correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

export { editarComentario, eliminarComentario, nuevoComentario };
