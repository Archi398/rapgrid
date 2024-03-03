import { Modal } from 'flowbite-react';
import React, { useEffect, useState, useCallback } from 'react';

export default function GridFinish({ lives, setLives, share, todaySeed, isDaily, anwsers }) {
  const [openModal, setOpenModal] = useState(false);
  const [awnserByID, setAwnserByID] = useState([]);

  const deactivateButton = useCallback(() => {
    document.querySelectorAll('[data-isbutton="true"]').forEach((button) => {
      button.disabled = true;
      button.classList.add("dark:bg-gray-600");
    });
    if (isDaily) localStorage.setItem(`lives_${todaySeed}`, 0);
    setLives(0);
    setOpenModal(true);
  }, [isDaily, todaySeed, setLives, setOpenModal]);

  function seeAnwsers(id) {
    const awnsers = isDaily ? JSON.parse(localStorage.getItem(`anwsers_${todaySeed}`)) : anwsers;
    setAwnserByID(awnsers[id])
  }

  useEffect(() => {
    if (lives === 0) {
      deactivateButton();
    }
    if (isDaily) {
      const livesDaily = localStorage.getItem(`lives_${todaySeed}`);
      if (livesDaily === "0") {
        deactivateButton();
      }
    }
  }, [lives, deactivateButton, isDaily, todaySeed]);

  return (
    <div className="flex justify-around	mt-8">
      <h1 className="flex items-center sm:text-3xl text-xl font-bold text-center">Vies : {lives}</h1>
      <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg border-gray-600 text-sm px-5 py-2.5 ml-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => deactivateButton()}>Abandonner</button>
      <Modal className="dark bg-opacity-50" show={openModal} size="4xl" position="top-center" onClose={() => setOpenModal(false)}>
        <Modal.Header>Ton résultat !</Modal.Header>
        <Modal.Body>
          <div>
            <div className="flex justify-around">
              <div className="grid grid-cols-3 gap-2">
                {[11, 12, 13, 21, 22, 23, 31, 32, 33].map((item) => {
                  return (
                    <button
                      key={item}
                      className={`size-10 md:size-20 rounded-lg hover:brightness-50 ${localStorage.getItem(`result_album_id_${todaySeed}_${item}`) ? "bg-green-500" : "bg-white"}`}
                      onClick={() => seeAnwsers(item)}
                    ></button>
                  )
                })}
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="sm:text-3xl text-xl font-bold	text-center">{localStorage.getItem(`result_correct_${todaySeed}_all`)}/9 Correctes</h1>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg border-gray-600 text-sm w-full sm:w-auto px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={share}>Partager</button>
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mt-4 mb-2">Clique sur une case pour voir les réponses possibles : </h1>
              {Object.values(awnserByID).length > 0 && (
                <ul className="dropdown-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mt-2 w-full">
                  {Object.values(awnserByID).map((answer, index) => (
                    <li key={index} className="p-2">
                      <div className="flex items-center">
                        <img className="h-10 max-w-lg rounded-lg mr-2" src={answer.img} alt={answer.name} />
                        <div className="flex flex-col">
                          <span className="font-bold">Nom : {answer.name}</span>
                          <span className="text-xs">Date : {answer.date}</span>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  )
}