import React, { useState, useContext } from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
// import icon from '../img/navigation/icon.png';
import SpotifyConnectButton from '../components/organisms/SpotifyConnectButton';
import { GlobalContext } from "../App";

export default function Navigation() {
  const location = useLocation();
  const { currentUserProfile, currentUserTopArtists } = useContext(GlobalContext);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <div className="md:w-1/6 flex items-center space-x-3 rtl:space-x-reverse">
            {
              currentUserProfile != null
                ?
                (
                  <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                    Salut <span className="text-green-500">{currentUserProfile.display_name}</span> !</span>
                )
                :
                (<></>)
            }
          </div>
          <div className="md:w-1/6 flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse justify-end">
            <SpotifyConnectButton></SpotifyConnectButton>
            <button
              onClick={toggleMenu}
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              aria-controls="navbar-sticky"
              aria-expanded={isMenuOpen ? 'true' : 'false'}
            >
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>
          <div className={`md:w-4/6 items-center justify-center ${isMenuOpen ? 'block' : 'hidden'} w-full md:flex md:w-auto md:order-1`} id="navbar-sticky">
            <ul
              className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
              <li>
                <NavLink
                  to="/"
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/" ? "text-blue-500" : "text-white"}`}
                  onClick={closeMenu}
                >
                  Accueil
                </NavLink>
              </li>
              <li>
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  className={`flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${location.pathname.includes("gridrap") ? "text-blue-500" : "text-white"}`}
                  onClick={toggleDropdown}
                >
                  RapGrid
                  <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none"
                    viewBox="0 0 10 6">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                  </svg></button>
                <div id="dropdownNavbar"
                  className={`z-10 font-normal bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-600 ${isDropdownOpen ? 'absolute' : 'hidden'}`}>
                  <ul className="py-2 text-sm text-gray-700 dark:text-gray-400" aria-labelledby="dropdownLargeButton">
                    <li>
                      <NavLink
                        to="/gridrap/day"
                        className={`block px-4 py-2 hover:bg-gray-600 ${location.pathname === "/gridrap/day" ? "text-blue-500" : "text-white"}`}
                        onClick={() => { closeMenu(); toggleDropdown(); }}
                      >
                        GridRap quotidien
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/gridrap/sandbox"
                        className={`block px-4 py-2 hover:bg-gray-600 ${location.pathname === "/gridrap/sandbox" ? "text-blue-500" : "text-white"}`}
                        onClick={() => { closeMenu(); toggleDropdown(); }}
                      >
                        Terrain de jeux GridRap
                      </NavLink>
                    </li>
                  </ul>
                  {
                    currentUserTopArtists != null
                      ?
                      (
                        <div className="py-1">
                          <NavLink
                            to="/gridrap/personal"
                            className={`block text-sm px-4 py-2 hover:bg-gray-600 ${location.pathname === "/gridrap/personal" ? "text-blue-500" : "text-white"}`}
                            onClick={() => { closeMenu(); toggleDropdown(); }}
                          >
                            GridRap personnel
                          </NavLink>
                        </div>
                      )
                      :
                      (<></>)
                  }
                </div>
              </li>
              <li>
                <NavLink
                  to="/quiz/fr"
                  className={`block py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700 ${location.pathname === "/quiz/fr" ? "text-blue-500" : "text-white"}`}
                  onClick={closeMenu}
                >
                  Quiz
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />



      <footer className="fixed bottom-0 left-0 z-20 w-full bg-white border-t border-gray-200 shadow flex items-center justify-between p-1 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Tous droits réservés &copy; 2024</span>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Par Saturnin et Archibald Sabatier</span>
      </footer>

    </div>
  );
}