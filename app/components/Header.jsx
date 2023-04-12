import { SolLeonIcon } from "./Decorative/SolLeonIcon"

export function Header({children, menu}) {
  function toggleNavlinks() {
    document.getElementById("navbar").classList.toggle("-translate-y-96")
  }

  function displayNavlinks() {
    return (
      <nav className={`fixed -z-10 overflow-hidden ease-out top-24 right-0w-full px-5 py-8 -translate-y-96 transition-all duration-300 md:block md:z-0 md:translate-y-0 md:static md:w-fit`} id="navbar">
        <ul className={`flex flex-col gap-5 text-center md:flex-row`}>
          {menu.items.map((menuItem) => (
            <li key={menuItem.id}>
              <a className="hover:text-c-sand transition-all duration-300" href={menuItem.to}>{menuItem.title.toUpperCase()}</a>
            </li>
          ))}
        </ul>
      </nav>
    );
  }

  return (
    <header
      role="banner"
      className={`flex fixed justify-center h-24 bg-black/70 font-montserrat font-semibold z-40 top-0 w-full leading-none gap-4 transition text-white`}
    >
      <div
        className={`flex flex-row justify-center w-full items-center px-12 max-w-7xl`}
      >
        {displayNavlinks()}
        <button className={`static md:hidden`} onClick={toggleNavlinks}>
          <i className="bi bi-list hover:text-c-sand transition-all duration-300" style={{fontSize: '40px'}}></i>
        </button>
      </div>
    </header>
  );
}
