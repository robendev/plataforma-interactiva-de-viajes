import { Form } from "react-router-dom";

export async function action({ request }) {
  const data = Object.fromEntries(await request.formData());

  const { username, email, avatarURL, password } = data;

  console.log(username);
  console.log(email);
  console.log(avatarURL);
  console.log(password);

  return data;
}

function Register() {
  return (
    <Form
      method="post"
      className="w-96 [&_label]:block [&_label]:w-full [&_input]:shadow-inner [&_input]:shadow-[#ccc] [&_input]:rounded [&_input]:block [&_input]:py-1 [&_input]:w-full"
    >
      <fieldset className="border border-black pt-[10px] px-[30px] pb-0 [&_div]:mb-5">
        <legend className="text-white bg-black py-1 px-3">Regístrate</legend>

        <div>
          <label htmlFor="username">Usuario (Alias)</label>
          <input
            id="username"
            type="text"
            name="username"
            required
            className="hover:bg-[#eee] focus:bg-[#eee]"
          />
        </div>

        <div>
          <label htmlFor="email">Correo electrónico</label>
          <input
            id="email"
            type="email"
            name="email"
            required
            className="hover:bg-[#eee] focus:bg-[#eee]"
          />
        </div>

        <div>
          <label htmlFor="avatarURL">URL Avatar (Optional)</label>
          <input
            id="avatarURL"
            type="url"
            name="avatarURL"
            className="hover:bg-[#eee] focus:bg-[#eee]"
          />
        </div>

        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            id="password"
            type="password"
            name="password"
            required
            className="hover:bg-[#eee] focus:bg-[#eee]"
          />
        </div>

        <div>
          <button
            type="submit"
            className="shadow shadow-black rounded block w-full py-1 transition duration-150 ease-out hover:bg-[#e6e6e6]"
          >
            Registrarte
          </button>
        </div>
      </fieldset>
    </Form>
  );
}

export default Register;
