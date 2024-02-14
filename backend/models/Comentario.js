import mongoose from "mongoose";
const { Schema } = mongoose;

const comentarioSchema = new Schema({
  author: {
    ref: "Usuario",
    required: true,
    type: Schema.Types.ObjectId,
  },
  description: {
    minlength: [4, "El {VALUE} debe tener al menos 4 caracteres."],
    required: true,
    trim: true,
    type: String,
  },
});

const Comentario = mongoose.model("Comentario", comentarioSchema);

export default Comentario;
