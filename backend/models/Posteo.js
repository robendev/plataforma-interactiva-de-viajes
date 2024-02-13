import mongoose from "mongoose";
const { Schema } = mongoose;

const posteoSchema = new Schema(
  {
    title: {
      minlength: [4, "El {VALUE} debe tener al menos 4 caracteres."],
      required: true,
      trim: true,
      type: String,
    },
    description: {
      minlength: [4, "El {VALUE} debe tener al menos 4 caracteres."],
      required: true,
      trim: true,
      type: String,
    },
    author: {
      ref: "Usuario",
      required: true,
      trim: true,
      type: Schema.Types.ObjectId,
    },
    comments: [
      {
        ref: "Comentario",
        type: Schema.Types.ObjectId,
      },
    ],
    imageURL: {
      default: "https://example.com/default-post-image.jpg",
      lowercase: true,
      trim: true,
      type: String,
    },
    createdAt: {
      default: Date.now,
      type: Date,
    },
  },
  {
    timestamps: false,
  }
);

const Posteo = mongoose.model("Posteo", posteoSchema);

export default Posteo;
