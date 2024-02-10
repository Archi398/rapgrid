import React from 'react';
import { Dropdown } from 'flowbite-react';
import { US, GB, FR } from 'country-flag-icons/react/3x2'

export default function GridOptions({ inputSeedRef, setSeed, region, setRegion, isCoverChecked, setIsCoverChecked }) {

  const handleCheckboxChange = (event) => {
    setIsCoverChecked(event.target.checked);
  };

  return (
    <div className="md:absolute md:top-1/4 md:-right-2/3 mt-8 md:mt-0 flex flex-col">
      <h1 className="text-xl text-gray-900 dark:text-white font-bold mb-4">Options :</h1>
      <div>
        <label htmlFor="input-seed" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Set seed to play with your friends :</label>
        <div className="flex">
          <input ref={inputSeedRef} type="text" id="input-seed" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-auto p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="" required />
          <button onClick={setSeed} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Reload</button>
        </div>
      </div>
      <div className="mt-8">
        <label htmlFor="dropdown-country" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Choose your region :</label>
        <div className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <Dropdown label="Available regions" id="dropdown-country" placement="right-start" >
            <Dropdown.Item onClick={() => setRegion('world')} className={region === "world" ? "bg-gray-500" : ""}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4 mr-2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
              World
            </Dropdown.Item>
            {/* <Dropdown.Item>
              <US title="United States" className="size-4 mr-2" />
              United States
            </Dropdown.Item> */}
            <Dropdown.Item onClick={() => setRegion('FR')} className={region === "FR" ? "bg-gray-500" : ""}>
              <FR title="France" className="size-4 mr-2" />
              France
            </Dropdown.Item>
            <Dropdown.Item onClick={() => setRegion('UK')} className={region === "UK" ? "bg-gray-500" : ""}>
              <GB title="United Kingdom" className="size-4 mr-2" />
              United Kingdom
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={() => setRegion('rockWorld')} className={region === "rockWorld" ? "bg-gray-500" : ""}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="size-4 mr-2" style={{ fill: 'white' }}>
                <path d="M465 7c-9.4-9.4-24.6-9.4-33.9 0L383 55c-2.4 2.4-4.3 5.3-5.5 8.5l-15.4 41-77.5 77.6c-45.1-29.4-99.3-30.2-131 1.6c-11 11-18 24.6-21.4 39.6c-3.7 16.6-19.1 30.7-36.1 31.6c-25.6 1.3-49.3 10.7-67.3 28.6C-16 328.4-7.6 409.4 47.5 464.5s136.1 63.5 180.9 18.7c17.9-17.9 27.4-41.7 28.6-67.3c.9-17 15-32.3 31.6-36.1c15-3.4 28.6-10.5 39.6-21.4c31.8-31.8 31-85.9 1.6-131l77.6-77.6 41-15.4c3.2-1.2 6.1-3.1 8.5-5.5l48-48c9.4-9.4 9.4-24.6 0-33.9L465 7zM208 256a48 48 0 1 1 0 96 48 48 0 1 1 0-96z" />
              </svg>
              Rock
            </Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="mt-8">
        <label htmlFor="checkbox-cover" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Search with album cover :</label>
        <div className="flex items-center rounded">
          <input checked={isCoverChecked} onChange={handleCheckboxChange} id="checkbox-cover" type="checkbox" value="" className="size-6 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
        </div>
      </div>
    </div>
  );
}
