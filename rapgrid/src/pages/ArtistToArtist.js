import React, { useEffect, useState, useCallback, useContext } from 'react';

import { artistWorld, artistUK, artistFR, artistRockWorld } from '../data/grid/artists';
import { GlobalContext } from "../App";

export default function ArtistToArtist() {
  const { sdkGlobal, currentUserTopArtists } = useContext(GlobalContext);

  const [artists, setArtists] = useState(null);
  const [artistFrom, setArtistFrom] = useState(null);
  const [artistTo, setArtistTo] = useState(null);

  const [currentList, setCurrentList] = useState([]);
  const [pathingList, setPathingList] = useState([]);
  const [loading, setLoading] = useState(false);


  function getRandomNumber(array) {
    const arrayLength = array.length;
    const randomIndices = new Set();

    while (randomIndices.size < 2) {
      const randomNumber = Math.floor(Math.random() * arrayLength);
      randomIndices.add(randomNumber);
    }

    return Array.from(randomIndices);
  };

  const setAlbumsList = useCallback(async (id) => {
    try {
      setLoading(true);
      const albums = await sdkGlobal.artists.albums(id, "album", "", 50);
      setCurrentList(albums.items);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  }, [sdkGlobal]);

  const setArtistsList = async (id) => {
    try {
      setLoading(true);
      const album = await sdkGlobal.albums.get(id, "", 50);
      let listIds = [];
      album.artists.forEach(artist => {
        if (!listIds.some(item => item === artist.id)) {
          listIds.push(artist.id);
        }
      });
      album.tracks.items.forEach(track => {
        if (track.artists.length > 0) {
          track.artists.forEach(artist => {
            if (!listIds.some(item => item === artist.id)) {
              listIds.push(artist.id);
            }
          });
        }
      });
      const artists = await sdkGlobal.artists.get(listIds);
      setCurrentList(artists);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectResult = async (result) => {
    setLoading(true);
    setCurrentList([]);
    setPathingList(prevstate => [...prevstate, result]);
    if (result.type === "album") {
      setArtistsList(result.id);
    }

    if (result.type === "artist") {
      setAlbumsList(result.id)
    }

  };



  useEffect(() => {
    setArtists(artistFR.filter((artist) => artist.followers.total > 3000000));
  }, []);

  useEffect(() => {
    if (artists != null) {
      const randomIndices = getRandomNumber(artists);
      setArtistFrom(artists[randomIndices[0]]);
      setArtistTo(artists[randomIndices[1]]);
      setAlbumsList(artists[randomIndices[0]].id);
      setPathingList(prevstate => [...prevstate, artists[randomIndices[0]]]);
    }
  }, [artists, setAlbumsList]);


  return (
    <div className="w-full mx-52">
      <div className="flex flex-col md:flex-row justify-between mb-4">
        <div className="flex items-center w-1/3">
          <img className="size-12 rounded-lg" src={artistFrom != null ? artistFrom.images[0].url : ""} alt={artistFrom != null ? artistFrom.name : ""} />
          <h3 className="ml-2 text-xl font-bold">{artistFrom != null ? artistFrom.name : ""}</h3>
        </div>
        <div className="flex justify-center items-center w-1/3">
          <svg className="size-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
          </svg>
        </div>
        <div className="flex items-center justify-end w-1/3">
          <img className="size-12 rounded-lg" src={artistTo != null ? artistTo.images[0].url : ""} alt={artistTo != null ? artistTo.name : ""} />
          <h3 className="ml-2 text-xl font-bold text-center">{artistTo != null ? artistTo.name : ""}</h3>
        </div>
      </div>

      <div>
        {pathingList.length > 0 && (
          <div className="flex flex-wrap">
            {
              pathingList.map((result, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <img className="size-12 rounded-full bg-blue-900" src={result.images[0]?.url || ''} alt={result.name} />
                  <svg className="size-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </div>
              ))
            }
          </div>
        )}
      </div>

      <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mt-2 w-full">
        {loading ? <p className="mt-2 ml-1">Chargement...</p> : null}
        {currentList.length > 0 && (
          <ul>
            {currentList.map((result, index) => (
              <li
                key={index}
                onClick={() => handleSelectResult(result)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
              >
                <div className="flex items-center">
                  <img className="size-10 max-w-lg rounded-lg mr-2 bg-blue-900" src={result.images[0]?.url || ''} alt={result.name} />
                  {result.name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
