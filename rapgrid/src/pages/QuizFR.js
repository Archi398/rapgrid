import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';

import QuizCard from '../components/organisms/QuizCard';

export default function QuizFR() {
  const containerRef = useRef(null);

  const [id, setId] = useState(1);
  const [artistsValue, setArtistsValue] = useState({
    booba: 0,
    sch: 0,
    jul: 0,
    lacrim: 0,
  });
  const [result, setResult] = useState([]);

  const handleButtonClick = (event) => {
    const artist = event.target.getAttribute("data-artist");

    setArtistsValue({ ...artistsValue, [artist]: artistsValue[artist] + 1 })
    setResult(Object.keys(artistsValue).sort(function (a, b) { return artistsValue[b] - artistsValue[a] }));
    setId(id + 1);
  };

  return (
    <div ref={containerRef}>
      <div className="text-center pb-8">
        <h1 className="text-4xl text-gray-900 dark:text-white font-bold tracking-tight underline dark:text-white decoration-amber-400">Quiz: devines quel rappeur tu es</h1>
      </div>
      <div id="quiz">
        <QuizCard
          id={id}
          buttonClick={handleButtonClick}
          artist={result[0]}
        ></QuizCard>
        <div className="flex justify-center mt-3">
          <NavLink
            to="/quiz/fr/secret"
          >
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-pink-500 to-orange-400 group-hover:from-pink-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Connaître les secrets du quiz
              </span>
            </button>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
