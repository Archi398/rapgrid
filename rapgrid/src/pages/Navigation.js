import React from 'react';
import { Outlet, Link, NavLink } from 'react-router-dom';
// import spotifyWebApiLogo from '../img/navigation/spotifyWebApiLogo.png';
import icon from '../img/navigation/icon.png'

export default function Navigation() {
  return (
    <div>
      <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">

          <div className="basis-1/3 flex justify-start">
            <Link to="/">
              <div className="flex items-center space-x-3 rtl:space-x-reverse">
                <img src={icon} className="h-8" alt="logo" />
                <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Je sais pas</span>
              </div>
            </Link>
          </div>

          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse basis-1/3 flex justify-end">
            {/* <div className="flex flex-col items-center space-x-3 rtl:space-x-reverse">
              <span className="self-center text-sm underline font-semibold whitespace-nowrap dark:text-white">Powered By</span>
              <img src={spotifyWebApiLogo} className="h-6" alt="logo" />
            </div> */}
            <button data-collapse-toggle="navbar-sticky" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-sticky" aria-expanded="false">
              <span className="sr-only">Open main menu</span>
              <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15" />
              </svg>
            </button>
          </div>

          <div className="basis-1/3 flex justify-center">
            <div className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
              <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                <li>
                  <NavLink
                    to="/"
                    className={({ isActive }) =>
                      isActive
                        ? "underline decoration-blue-500"
                        : ""
                    }
                  >
                    <div className="text-lg block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      Home
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/gridrap"
                    className={({ isActive }) =>
                      isActive
                        ? "underline decoration-blue-500"
                        : ""
                    }
                  >
                    <div className="text-lg block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      GridRap
                    </div>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/quiz/fr"
                    className={({ isActive }) =>
                      isActive
                        ? "underline decoration-blue-500"
                        : ""
                    }
                  >
                    <div className="text-lg block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700">
                      Quiz FR
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />



      <footer className="fixed bottom-0 left-0 z-20 w-full p-1 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-2 dark:bg-gray-800 dark:border-gray-600">
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Tous droits réservés &copy; 2024</span>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">Par Saturnin Sabatier et développé par Archibald Sabatier</span>
      </footer>

    </div>
  );
}