import { Form } from "react-router-dom";

function Login() {
  return (
    <Form
      method="post"
      className="w-72 lg:w-80 [&_label]:block [&_input]:w-full"
    >
      <fieldset className="pt-[10px] px-[30px] pb-0 border">
        <legend className="bg-black text-white py-[5px] px-[10px]">
          Iniciar sesión
        </legend>

        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input id="email" type="email" name="email" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input id="password" type="password" name="password" />
        </div>
        <div>
          <button>Entrar</button>
        </div>
      </fieldset>
    </Form>
  );
}

export default Login;
