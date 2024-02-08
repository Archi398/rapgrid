import React from 'react';
import QuizQuestion from '../molecules/QuizQuestion'
import QuizResult from '../molecules/QuizResult'


export default function QuizCard({ id, buttonClick, artist }) {

  return (
    <div>
      <div className="block max-w-screen-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        {
          id <= 11 ?
              <QuizQuestion
                id={id}
                buttonClick={buttonClick}
              ></QuizQuestion>
            :
              <QuizResult
                id={id}
                artistr={artist}
              ></QuizResult>
        }
      </div>
    </div>
  );
}
