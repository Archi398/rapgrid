import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

export default function NavDropdown({ children, textSlug, currentUserTopArtists, closeMenu }) {
  const location = useLocation();

  return (
    <>
      <button
        id={`dropdownNavbarLink${textSlug}`}
        data-dropdown-toggle={`dropdownNavbar${textSlug}`}
        className={`flex items-center justify-between w-full py-2 px-3 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent ${location.pathname.includes(textSlug) ? "text-blue-500" : "text-white"}`}
      >
        {children}
        <svg className="w-2.5 h-2.5 ms-2.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
        </svg>
      </button>
      <div
        id={`dropdownNavbar${textSlug}`}
        className="z-10 hidden font-normal bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 divide-y divide-gray-600"
      >
        <ul className="py-2 text-sm text-gray-700 dark:text-gray-400">
          <li>
            <NavLink
              to={`/${textSlug}/day`}
              className={`block px-4 py-2 hover:bg-gray-600 ${location.pathname === `/${textSlug}/day` ? "text-blue-500" : "text-white"}`}
              onClick={() => { closeMenu(); }}
            >
              {children} quotidien
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`/${textSlug}/sandbox`}
              className={`block px-4 py-2 hover:bg-gray-600 ${location.pathname === `/${textSlug}/sandbox` ? "text-blue-500" : "text-white"}`}
              onClick={() => { closeMenu(); }}
            >
              Terrain de jeux {children}
            </NavLink>
          </li>
        </ul>
        {
          currentUserTopArtists != null
            ?
            (
              <div className="py-1">
                <NavLink
                  to={`/${textSlug}/personal`}
                  className={`block text-sm px-4 py-2 hover:bg-gray-600 ${location.pathname === `/${textSlug}/personal` ? "text-blue-500" : "text-white"}`}
                  onClick={() => { closeMenu(); }}
                >
                  {children} personnel
                </NavLink>
              </div>
            )
            :
            (<></>)
        }
      </div>
    </>

  );
}
