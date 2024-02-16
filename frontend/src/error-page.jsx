import { useRouteError } from "react-router-dom";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="min-h-screen">
      <h1 className="text-6xl mb-2">Oops!</h1>
      <p className="text-1xl mb-5">Sorry, an unexpected error has occurred.</p>
      <p className="text-4xl border-b border-[#ff0000] p-1 rounded transition transform ease-in-out hover:scale-110 duration-300 *:text-[#ff0000]">
        <i className="mr-5">{error.statusText || error.message}</i>
        <span className="material-symbols-outlined">error</span>
      </p>
    </div>
  );
}

export default ErrorPage;
