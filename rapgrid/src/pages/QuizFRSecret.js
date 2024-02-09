import React from 'react';
import { questions, answers } from '../components/molecules/QuizQuestion'
import QuizImg from '../components/atoms/QuizImg';
import QuizTitle from '../components/atoms/QuizTitle';

import { Accordion } from 'flowbite-react';

export default function QuizFRSecret() {
  return (
    <div>
      <div className="text-center pb-8">
        <h1 className="text-4xl text-gray-900 dark:text-white font-bold tracking-tight underline dark:text-white decoration-green-600">Cliquez sur les réponses pour savoir la source</h1>
      </div>
      <div>
        {
          questions.map((question, index) => {
            return (
              <div className="block mb-2 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <QuizTitle key={question.id}>{question.id}. {question.text}</QuizTitle>
                <div className="md:flex">
                  <div className="flex flex-col md:w-1/2">
                    <QuizImg key={question.id} src={question.img} alt={""} />
                  </div>
                  <div className="flex flex-col md:w-1/2 md:ml-16 mt-8 md:mt-0 justify-center">
                    <Accordion collapseAll>
                      {
                        answers.filter((answer) => answer.group === question.id).map((answer, index) => {
                          return (
                            <Accordion.Panel>
                              <Accordion.Title className="focus:ring-4 focus:ring-green-200 dark:focus:ring-green-800">{answer.text}</Accordion.Title>
                              <Accordion.Content>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                  Artist : {answer.artist}
                                </p>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                  Song : {answer.source.song}
                                </p>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                  Lyrics : "{answer.source.lyrics}"
                                </p>
                                <p>
                                  <a href={answer.source.link} target="_blank" rel="noreferrer" className="text-blue-600 dark:text-blue-500 hover:underline">
                                    Learn more on Genius
                                  </a>
                                </p>
                              </Accordion.Content>
                            </Accordion.Panel>
                          )
                        })
                      }
                    </Accordion>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
}
