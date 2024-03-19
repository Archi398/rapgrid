import React, { useEffect, useState, useCallback, useContext } from 'react';
import '../style/ArtistToArtist.css';
import seedrandom from 'seedrandom';

import ATAFinish from '../components/organisms/ATAFinish';
import ATAFromToHead from '../components/molecules/ATAFromToHead';

import { artistFR } from '../data/grid/artists';
import { GlobalContext } from "../App";

export default function ArtistToArtist({ isDaily, isPersonal, isShared }) {
  const { sdkGlobal, currentUserTopArtists, todaySeed } = useContext(GlobalContext);

  if (isDaily) {
    seedrandom(todaySeed, { global: true });
  }

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

  function chunkArray(array, chunkSize) {
    const results = [];
    while (array.length) {
      results.push(array.splice(0, chunkSize));
    }
    return results;
  }

  const setAlbumsList = useCallback(async (id) => {
    try {
      setLoading(true);
      const artistsAlbums = await sdkGlobal.artists.albums(id, "album", "", 50);
      const listIds = artistsAlbums.items.map(album => album.id);
      const chunkedIds = chunkArray(listIds, 20);
      for (const ids of chunkedIds) {
        const albums = await sdkGlobal.albums.get(ids);
        setCurrentList(prevstate => [...prevstate, ...albums]);
      }
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

  const initShared = useCallback(() => {
    const urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams.entries());

    const artistFrom = artists.find(artist => artist.id === params.from);
    const artistTo = artists.find(artist => artist.id === params.to);

    setArtistFrom(artistFrom);
    setArtistTo(artistTo);
    setAlbumsList(artistFrom.id);
    setPathingList(prevstate => [...prevstate, artistFrom]);
  }, [artists, setAlbumsList]);

  useEffect(() => {
    if (isPersonal) {
      if (currentUserTopArtists) {
        setArtists(currentUserTopArtists.filter((artist) => artist.followers.total > 3000000));
      }
    } else {
      if (!artists) {
        setArtists(artistFR.filter((artist) => artist.followers.total > 3000000));
      }
    }
  }, [isPersonal, currentUserTopArtists]);

  useEffect(() => {
    if (artists != null) {
      if (isShared) {
        initShared();
      } else {
        const randomIndices = getRandomNumber(artists);
        setArtistFrom(artists[randomIndices[0]]);
        setArtistTo(artists[randomIndices[1]]);
        setAlbumsList(artists[randomIndices[0]].id);
        setPathingList(prevstate => [...prevstate, artists[randomIndices[0]]]);
      }
    }
  }, [artists, setAlbumsList, isShared, initShared]);


  return (
    <div className="w-full mx-52">
      <ATAFromToHead
        artistFrom={artistFrom}
        artistTo={artistTo}
      />

      <div>
        {pathingList.length > 0 && (
          <div className="flex flex-wrap">
            {
              pathingList.map((result, index) => (
                <div className="flex items-center mb-2" key={index}>
                  <img className={`size-12 rounded-${result.type === "album" ? "full" : "md"} bg-blue-900`} src={result.images[0]?.url || ''} alt={result.name} />
                  <svg className="size-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                  </svg>
                </div>
              ))
            }
          </div>
        )}
      </div>
      <h3 className="text-2xl font-bold">Choisissez un {currentList.length > 0 && currentList[0].type === "album" ? "album" : "artiste"} :</h3>
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
                  <img className={`size-10 max-w-lg rounded-${result.type === "album" ? "full" : "md"} mr-2 bg-blue-900`} src={result.images[0]?.url || ''} alt={result.name} />
                  {result.name}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      <ATAFinish
        isDaily={isDaily}
        artistFrom={artistFrom}
        artistTo={artistTo}
        pathingList={pathingList}
      />
    </div>
  );
}
