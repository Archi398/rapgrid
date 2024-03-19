import React, { useEffect, useState, useContext } from 'react';
import { Modal } from 'flowbite-react';
import { toast, ToastContainer } from 'react-toastify';

import { GlobalContext } from "../../App";
import ATAFromToHead from '../molecules/ATAFromToHead';

export default function ATAFinish({ isDaily, artistFrom, artistTo, pathingList }) {
  const { todaySeed } = useContext(GlobalContext);

  const [openModal, setOpenModal] = useState(false);

  const optionsToast = {
    theme: "dark",
    autoClose: 2500,
  };

  async function share() {

    let textTitle = `Voici mon résultat`;
    if (isDaily) {
      textTitle = `Artist to Artist du ${todaySeed}`;
    }


    let linkShare = `${process.env.REACT_APP_BASE_URL}/artist-to-artist/shared?from=${artistFrom.id}&to=${artistTo.id}`;
    if (isDaily) {
      linkShare = `${process.env.REACT_APP_BASE_URL}/artist-to-artist/day`;
    }

    const textToCopy = `${textTitle} :

Pour "${artistFrom.name}" à "${artistTo.name}" 
Nombres d'étapes : ${pathingList.length - 2}

${linkShare}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copié dans le presse-papier !", optionsToast);
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
    }
  }

  useEffect(() => {
    if (artistTo !== null && pathingList.length > 0) {
      if (artistTo.id === pathingList[pathingList.length - 1].id) {
        pathingList.forEach((element, index) => {
          if (element.type === "album") {
            element.result = [];
            element.tracks.items.forEach(track => {
              if (track.artists.some(artist => artist.id === pathingList[index + 1].id)) {
                pathingList[index].result.push(track);
              }
            });
          }
        });
        setOpenModal(true);
      }
    }
  }, [artistTo, pathingList]);



  return (
    <div className="flex justify-around	mt-8">
      <Modal className="dark bg-opacity-50" show={openModal} size="4xl" position="top-center" onClose={() => setOpenModal(false)}>
        <Modal.Header>Ton résultat !</Modal.Header>
        <Modal.Body>
          <div>
            <ATAFromToHead
              artistFrom={artistFrom}
              artistTo={artistTo}
            />
            <hr className="mb-4" />
            <div className="flex justify-between items-start	">
              <div>
                {pathingList.length > 0 && (
                  <div className="flex flex-col flex-wrap">
                    {
                      pathingList.map((result, index) => (
                        <div className="flex flex-col" key={index}>
                          <div className="flex items-center">
                            <img className={`size-12 rounded-${result.type === "album" ? "full" : "md"} bg-blue-900`} src={result.images[0]?.url || ''} alt={result.name} />
                            <h3 className="ml-2 text-xl font-bold">{result.name}</h3>
                            {
                              result.type === "album" && result.result && result.result.length > 0
                                ?
                                <div className="flex flex-col ml-3">
                                  <h3 className="text-base underline">Morceau utilisé pour la liaison :</h3>
                                  <ul>
                                    {
                                      result.result.map((track, index) => (
                                        <li key={index} className="text-sm text-green-500">{track.name}</li>
                                      ))
                                    }
                                  </ul>
                                </div>
                                :
                                null
                            }

                          </div>
                          <div className="ml-3">
                            {
                              pathingList.length - 1 !== index
                                ?
                                <svg className="size-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19V5m0 14-4-4m4 4 4-4" />
                                </svg>
                                :
                                null
                            }
                          </div>
                        </div>
                      ))
                    }
                  </div>
                )}
              </div>
              <div className="flex flex-col justify-center">
                <h1 className="sm:text-3xl text-xl font-bold	text-center">Nombres d'étapes : {pathingList.length - 2}</h1>
                <h1 className="sm:text-3xl text-xl font-bold	text-center">Nombres d'albums : {pathingList.filter(item => item.type === 'album').length}</h1>
                <button className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg border-gray-600 text-sm w-full sm:w-auto px-5 py-2.5 mt-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={share}>Partager</button>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
      <ToastContainer />
    </div>
  )
}