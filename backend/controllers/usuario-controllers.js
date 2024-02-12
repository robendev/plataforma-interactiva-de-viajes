import Usuario from "../models/Usuario.js";
import { generarID } from "../helpers/generar-id.js";
import { generarJWT } from "../helpers/generar-jwt.js";

// ----------------------------------------------------------------

const registrar = async (req, res) => {
  const { username, password, email } = req.body;

  // Evitar registros duplicados
  const existeUsuario = await Usuario.findOne({ email });
  if (existeUsuario) {
    const error = new Error("Usuario ya registrado");
    return res.status(400).json({ msg: error.message });
  }

  try {
    const usuario = new Usuario({
      username,
      password,
      email,
    });
    usuario.token = generarID();

    await usuario.save();

    // res.json({ msg: "Usuario creado correctamente" });
    res.status(201).send(usuario);
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

const autenticar = async (req, res) => {
  const { email, password } = req.body;

  // Verificar que el usuario existe para poder loguearse
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  // Si el usuario existe, verificamos que la cuenta este confirmada
  if (!usuario.isConfirmed) {
    const error = new Error(
      "La cuenta no ha sido confirmada, verifica tu Email"
    );
    return res.status(403).json({ msg: error.message });
  }

  // Si la cuenta esta confirmada, verificamos que la contraseña ingresada sea igual a la contraseña del usuario existente
  if (await usuario.comprobarPassword(password)) {
    res.json({
      _id: usuario._id,
      username: usuario.username,
      email: usuario.email,
      avatarURL: usuario.avatarURL,
      token: generarJWT(usuario._id),
    });
  } else {
    const error = new Error("La contraseña es incorrecta");
    return res.status(401).json({ msg: error.message });
  }
};

// ----------------------------------------------------------------

const confirmar = async (req, res) => {
  const { token } = req.params;

  const usuarioConfirmar = await Usuario.findOne({ token });
  if (!usuarioConfirmar) {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
  try {
    usuarioConfirmar.isConfirmed = true;
    usuarioConfirmar.token = "";

    await usuarioConfirmar.save();

    res.status(200).json({ msg: "Usuario Confirmado Correctamente" });
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

const olvidePassword = async (req, res) => {
  const { email } = req.body;

  // Verificar que el usuario existe para poder cambiar su contraseña
  const usuario = await Usuario.findOne({ email });
  if (!usuario) {
    const error = new Error("El Usuario no existe");
    return res.status(404).json({ msg: error.message });
  }

  try {
    usuario.token = generarID();
    await usuario.save();

    res.json({
      msg: "Hemos enviado un email con las instrucciones para modificar tu contraseña",
    });
  } catch (error) {
    console.log(error);
  }
};

// ----------------------------------------------------------------

const comprobarToken = async (req, res) => {
  const { token } = req.params;

  // Verificamos que el token sea valido, teniendo que existir en algun usuario
  const tokenValido = await Usuario.findOne({ token });
  if (tokenValido) {
    res.json({ msg: "Token valido y el Usuario existe" });
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

// ----------------------------------------------------------------

const nuevoPassword = async (req, res) => {
  const { token } = req.params;
  const { password } = req.body;

  // Verificamos que el token sea valido, teniendo que existir en algun usuario
  const usuario = await Usuario.findOne({ token });
  if (usuario) {
    usuario.password = password;
    usuario.token = "";

    try {
      await usuario.save();

      res.json({ msg: "Password modificado correctamente" });
    } catch (error) {
      console.log(error);
    }
  } else {
    const error = new Error("Token no valido");
    return res.status(400).json({ msg: error.message });
  }
};

// ----------------------------------------------------------------

export {
  registrar,
  autenticar,
  confirmar,
  olvidePassword,
  comprobarToken,
  nuevoPassword,
};
