import routes from '../static/routes.json';
import { SolLeonIcon } from "./Decorative/SolLeonIcon"

export function Header({children}) {
  function toggleNavlinks() {
    document.getElementById("navbar").classList.toggle("-translate-y-96")
  }

  function displayNavlinks() {
    return (
      <nav className={`fixed -z-10 overflow-hidden ease-out top-24 right-0 bg-black w-full px-5 py-8 -translate-y-96 transition-all duration-300 md:block md:z-0 md:translate-y-0 md:static md:w-fit`} id="navbar">
        <ul className={`flex flex-col gap-5 text-center md:flex-row`}>
          {routes.map((route, i) => (
            <li key={i}>
              <a className={`hover:text-yellow-500 transition-all`} href={route.url}>{route.name}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <header
      role="banner"
      className={`flex justify-center h-24 sticky backdrop-blur-lg z-40 top-0 w-full leading-none gap-4 antialiased transition shadow-sm bg-black text-white`}
    >
      <div
        className={`flex flex-row justify-between w-full items-center px-12 max-w-7xl`}
      >
        <a href="/" className="flex gap-12 h-auto">
        <SolLeonIcon width={`100px`} color={`white`} />
        </a>
        {displayNavlinks()}
        <button className={`static md:hidden`} onClick={toggleNavlinks}>
          <i className="bi bi-list hover:text-yellow-500 transition-all" style={{fontSize: '40px'}}></i>
        </button>
      </div>
    </header>
  );
}
