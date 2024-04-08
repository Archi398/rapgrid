import React, { useEffect, useState, useCallback, useContext } from 'react';
import seedrandom from 'seedrandom';
import { debounce } from '../utils/debounce';
import { ToastContainer, toast } from 'react-toastify';
import { artistFR } from '../data/grid/artists';
import { GlobalContext } from "../App";

export default function RelatedTo({ isDaily, isPersonal, isShared }) {
  const { sdkGlobal, currentUserTopArtists, todaySeed } = useContext(GlobalContext);
  if (isDaily) {
    seedrandom(todaySeed, { global: true });
  }
  const optionsToast = {
    theme: "dark",
    autoClose: 2500,
  };

  const [artists, setArtists] = useState(null);
  const [currentArtist, setCurrentArtist] = useState(null);
  const [currentRelatedArtist, setCurrenRelatedtArtist] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [listResults, setListResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const getRandomIndex = useCallback((array) => {
    return Math.floor(Math.random() * array.length);
  }, []);

  const getColorByValue = useCallback((num) => {
    if (num >= 66) {
      return "green-500";
    } else if (num >= 33) {
      return "yellow-500";
    } else {
      return "red-500";
    }
  }, []);

  const fetchArtistsRelated = useCallback(async (id) => {
    try {
      const artistsRelated = await sdkGlobal.artists.relatedArtists(id);
      return artistsRelated.artists;
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  }, [sdkGlobal]);


  const fetchSearchResults = async (term) => {
    try {
      const items = await sdkGlobal.search(`artist:${term}`, ["artist"], "", 10);

      setSearchResults(items.artists.items);
    } catch (error) {
      if (error.name === 'AbortError') {
        console.log('Fetch aborted');
      } else {
        console.error('Error fetching search results:', error);
      }
    } finally {
      setLoading(false);
    }
  };


  const debouncedFetchSearchResults = useCallback(
    debounce((term) => fetchSearchResults(term), 250),
    []
  );

  const handleInputChange = useCallback((event) => {
    const term = event.target.value;
    setLoading(true);
    setSearchTerm(term);
    if (term.trim() !== '') {
      debouncedFetchSearchResults(term);
    } else {
      setSearchTerm('');
      setSearchResults([]);
      setLoading(false);
    }
  }, [setLoading, setSearchTerm, setSearchResults, debouncedFetchSearchResults]);

  const handleSelectResult = async (result) => {
    setLoading(true);
    if (result.id === currentArtist.id) {
      toast.success("Bravo !", optionsToast);
    } else {
      const resultIndexInRelatedArtists = currentRelatedArtist.findIndex((artist) => artist.id === result.id);
      if (resultIndexInRelatedArtists !== -1) {
        let value = 100 - (Math.max(0, Math.min(20, resultIndexInRelatedArtists) * 5));
        const newValue = { ...currentRelatedArtist[resultIndexInRelatedArtists], value: value === 100 ? 99 : value, color: getColorByValue(value) };
        setListResults(prevstate => {
          const newListResults = [...prevstate, newValue];
          newListResults.sort((a, b) => b.value - a.value);
          return newListResults;
        });
      } else {
        const artistsRelatedResult = await fetchArtistsRelated(result.id);
        const resultIndexInArtistsRelated = artistsRelatedResult.findIndex((artist) => artist.id === currentArtist.id);
        if (resultIndexInArtistsRelated !== -1) {
          let value = 100 - (Math.max(0, Math.min(20, resultIndexInArtistsRelated) * 5));
          const newValue = { ...result, value: value === 100 ? 99 : value, color: getColorByValue(value) };
          setListResults(prevstate => {
            const newListResults = [...prevstate, newValue];
            newListResults.sort((a, b) => b.value - a.value);
            return newListResults;
          });
        } else {
          let value = result.genres.filter(value => currentArtist.genres.includes(value)).length * 15;
          const newValue = { ...result, value: value, color: getColorByValue(value) };
          setListResults(prevstate => {
            const newListResults = [...prevstate, newValue];
            newListResults.sort((a, b) => b.value - a.value);
            return newListResults;
          });
        }
      }
    }

    setSearchTerm('');
    setSearchResults([]);
    setLoading(false);
  };

  const initShared = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams.entries());

    const artist = await sdkGlobal.artists.get(params.artist);

    setCurrentArtist(artist);
  }, [sdkGlobal, setCurrentArtist]);

  const init = useCallback(async () => {
    const randomIndex = getRandomIndex(artists);
    setCurrentArtist(artists[randomIndex]);
    const relatedArtists = await fetchArtistsRelated(artists[randomIndex].id);
    setCurrenRelatedtArtist(relatedArtists);
  }, [getRandomIndex, setCurrentArtist, artists, fetchArtistsRelated, setCurrenRelatedtArtist]);

  useEffect(() => {
    if (isPersonal) {
      if (currentUserTopArtists) {
        setArtists(currentUserTopArtists);
      }
    } else {
      if (!artists) {
        setArtists(artistFR.filter((artist) => artist.followers.total > 2000000));
      }
    }
  }, [isPersonal]);

  useEffect(() => {
    if (artists != null) {
      if (isShared) {
        initShared();
      } else {
        init();
      }
    }
  }, [artists, init, isShared, initShared]);


  // useEffect(() => {
  //   if (currentArtist && currentRelatedArtist) {
  //     console.log({ name: currentArtist.name, currentArtist, currentRelatedArtist });
  //   }
  // }, [currentArtist, currentRelatedArtist]);

  return (
    currentArtist && currentRelatedArtist
      ?
      <div className="w-full mx-52">
        <form className="max-w-md mx-auto" onSubmit={(event) => {
          event.preventDefault();
          if (searchResults.length > 0) {
            handleSelectResult(searchResults[0]);
          }
        }}>
          <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
          <div className="relative">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="search" id="default-search" value={searchTerm} className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search artists ..." onChange={handleInputChange} />
          </div>
        </form>
        {loading ? <p className="mt-2 ml-1">Chargement...</p> : null}
        {searchResults.length > 0 && (
          <ul className="dropdown-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mt-2 w-full">
            {searchResults.map((result, index) => (
              <li
                key={index}
                onClick={() => handleSelectResult(result)}
                className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
              >
                <div className="flex items-center">
                  <img className="h-10 max-w-lg rounded-lg mr-2" src={result.images?.[2]?.url} />
                  {result.name}
                </div>
              </li>
            ))}
          </ul>
        )}
        {listResults.length > 0 && (
          <div>
            {listResults.map((result, index) => (
              <div key={index}>
                <span className={`mb-1 text-base font-medium text-${result.color}`}>{result.name}</span>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4 dark:bg-gray-700">
                  <div className={`bg-${result.color} h-2.5 rounded-full`} style={{ width: `${result.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        )}
        <ToastContainer />
      </div>
      : null
  );
}
