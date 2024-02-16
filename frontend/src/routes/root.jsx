import { Outlet, NavLink } from "react-router-dom";

function Root() {
  return (
    <>
      <header className="h-[80px] grid items-center">
        <nav className="flex flex-row justify-between items-center py-3 [&_a]:p-3">
          <ul className="ml-5">
            <li className="">
              <NavLink to="/">Logo</NavLink>
            </li>
          </ul>

          <ul className="flex gap-5 mr-5 text-xl [&_a]:shadow [&_a]:shadow-black [&_a]:rounded-3xl ">
            {/* [&_a.active]:text-yellow-400 */}
            <li className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
              <NavLink to="/iniciar-sesion">Iniciar sesión</NavLink>
            </li>
            <li className="transition ease-in-out delay-100 hover:-translate-y-1 hover:scale-110 duration-300">
              <NavLink to="/registrarse">Regístrate</NavLink>
            </li>
          </ul>
        </nav>
      </header>

      <section className="flex flex-col lg:flex-row gap-2">
        <div className="lg:w-1/2 flex flex-col gap-4 [&_p]:font-normal [&_p]:text-balance [&_p]:px-5">
          <h1 className="text-5xl font-black text-pretty py-10 px-5">
            Comparte tus aventuras:{" "}
            <span className="text-4xl font-bold">
              la web donde puedes publicar y descubrir las mejores experiencias
              de viaje.
            </span>
          </h1>

          <p>
            ¿Te gusta viajar y vivir experiencias únicas? ¿Quieres conocer las
            historias y los consejos de otros viajeros que han recorrido el
            mundo? ¿Te gustaría compartir tus propias aventuras y recibir
            comentarios y sugerencias?
          </p>

          <p>
            Entonces, esta es la web que estabas buscando. Comparte tus
            aventuras es una comunidad online donde puedes publicar y leer
            relatos de viajes, fotos, videos y más.
          </p>

          <p>
            Aquí podrás encontrar inspiración para tus próximos destinos,
            aprender de las vivencias de otros viajeros y hacer nuevos amigos.
          </p>

          <p className="mb-[16px]">
            Además, podrás participar en sorteos, concursos y promociones
            exclusivas para los miembros de la web. No esperes más, únete a
            Comparte tus aventuras y empieza a disfrutar de la magia de viajar.
          </p>
        </div>

        <main className="lg:w-1/2 my-10 lg:my-0 grid place-content-center">
          <Outlet />
        </main>
      </section>

      <footer className="pl-5 py-3 font-bold">
        All Rights Reserved 2024 &copy;
      </footer>
    </>
  );
}

export default Root;
