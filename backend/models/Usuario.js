import bcrypt from "bcrypt";
import mongoose from "mongoose";
const { Schema } = mongoose;

const usuarioSchema = new Schema(
  {
    username: {
      //   lowercase: true,
      minlength: [4, "El {VALUE} debe tener al menos 4 caracteres."],
      required: true,
      trim: true,
      type: String,
    },
    password: {
      minlength: [6, "El {VALUE} debe tener al menos 6 caracteres."],
      required: true,
      trim: true,
      type: String,
    },
    email: {
      lowercase: true,
      required: true,
      trim: true,
      type: String,
      unique: true,
    },
    avatarURL: {
      default: "https://example.com/default-avatar.png",
      lowercase: true,
      trim: true,
      type: String,
    },
    isConfirmed: {
      default: false,
      type: Boolean,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

usuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

usuarioSchema.methods.comprobarPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const Usuario = mongoose.model("Usuario", usuarioSchema);

export default Usuario;
