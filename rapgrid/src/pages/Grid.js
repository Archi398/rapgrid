import '../style/Grid.css';
import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import seedrandom from 'seedrandom';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

import GridButtonModal from '../components/molecules/GridButtonModal';
import GridOptions from '../components/organisms/GridOptions';

import { artistWorld, artistUK, artistFR, artistRockWorld } from '../data/grid/artists';

//const sdk = SpotifyApi.withUserAuthorization("7b1532e31e4f4ab28f471527aa4ab785", "https://localhost:3000");

const sdk = SpotifyApi.withClientCredentials("7b1532e31e4f4ab28f471527aa4ab785", "4099a973c7084a31972ed8a44c878796");

// const items = await sdk.search("genre:rock", ["artist"], "", 50);
// const items2 = await sdk.search("genre:rock", ["artist"], "", 50, 50);
// const items3 = await sdk.search("genre:rock", ["artist"], "", 50, 100);

// const artistsaze = items.artists.items.concat(items2.artists.items,items3.artists.items);
// console.log(artistsaze);
// console.log(artistsaze.filter((artist) => artist.followers.total > 3000000));

//artistsSort.sort((a, b) => b.followers.total - a.followers.total);

export default function Grid() {
  const categories = useMemo(() => [
    {
      id: 1,
      name: "Album between 2006 and 2024",
      check: function (album) {
        return parseInt(album.release_date.split('-')[0]) >= 2006 && parseInt(album.release_date.split('-')[0]) <= 2024;
      },
    },
    {
      id: 2,
      name: "Album between 1991 and 2005",
      check: function (album) {
        return parseInt(album.release_date.split('-')[0]) >= 1991 && parseInt(album.release_date.split('-')[0]) <= 2005;
      },
    },
    {
      id: 3,
      name: "Album beginning with a vowel",
      check: function (album) {
        return "aeiouy".includes(album.name.charAt(0).toLowerCase());
      },
    },
    {
      id: 4,
      name: "One word title (Ignore 'the')",
      check: function (album) {
        let patternThe = /^[Tt][Hh][Ee] [A-Za-z]+$/;
        let oneWord = /^[A-Za-z]+$/;
        return patternThe.test(album.name) || oneWord.test(album.name);
      },
    },
    {
      id: 5,
      name: "Album with more than 16 tracks",
      check: function (album) {
        return album.total_tracks > 16;;
      },
    },
    {
      id: 6,
      name: "Album with 16 tracks or less",
      check: function (album) {
        return album.total_tracks <= 16;;
      },
    },
    // {
    //     id: 7,
    //     name: "Album featuring Kanye West"
    // },
    // {
    //     id: 8,
    //     name: "Mixtape"
    // },
    // {
    //     id: 9,
    //     name: "Top 10 Billboard album"
    // },
  ], []);
  const gridRef = useRef(null);
  const inputSeedRef = useRef(null);

  const [loading, setLoading] = useState(false);

  const [artistRow1, setartistRow1] = useState('');
  const [artistRow2, setartistRow2] = useState('');
  const [artistRow3, setartistRow3] = useState('');
  const [categCol1, setcategCol1] = useState({});
  const [categCol2, setcategCol2] = useState({});
  const [categCol3, setcategCol3] = useState({});

  const [artists, setArtists] = useState(null);
  const [region, setRegion] = useState('world');
  const [isCoverChecked, setIsCoverChecked] = useState(false);

  const fetchDataArtist = async (id) => {
    try {
      setLoading(true);
      const artistAlbums = await sdk.artists.albums(id, "album", "", 50)
      return artistAlbums.items;
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      //setLoading(false);
    }
  };

  const checkRowByCol = async (artistID, categ1, categ2, categ3) => {
    const arrayArtistAlbums = await fetchDataArtist(artistID);

    let flag1 = false;
    let flag2 = false;
    let flag3 = false;

    arrayArtistAlbums.forEach(album => {
      if (categ1.check(album)) {
        flag1 = true;
      }
      if (categ2.check(album)) {
        flag2 = true;
      }
      if (categ3.check(album)) {
        flag3 = true;
      }
    });

    return (flag1 && flag2 && flag3);
  };

  const getRandomNumberForDay = useCallback(() => {
    const today = new Date();
    const seed = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate();
    seedrandom(seed, { global: true });

    const categoriesLength = categories.length;

    let randomNumber1 = Math.floor(Math.random() * categoriesLength);
    let randomNumber2;
    do {
      randomNumber2 = Math.floor(Math.random() * categoriesLength);
    } while (randomNumber2 === randomNumber1);
    let randomNumber3;
    do {
      randomNumber3 = Math.floor(Math.random() * categoriesLength);
    } while (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2);

    return [randomNumber1, randomNumber2, randomNumber3];
  }, [categories]);

  const getRandomNumber = useCallback((array, seed) => {
    if (seed) {
      seedrandom(seed, { global: true });
    }

    const arrayLength = array.length;

    let randomNumber1 = Math.floor(Math.random() * arrayLength);
    let randomNumber2;
    do {
      randomNumber2 = Math.floor(Math.random() * arrayLength);
    } while (randomNumber2 === randomNumber1);
    let randomNumber3;
    do {
      randomNumber3 = Math.floor(Math.random() * arrayLength);
    } while (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2);

    return [randomNumber1, randomNumber2, randomNumber3];
  }, []);

  const initRows = useCallback(async (seed) => {
    const randCateg = getRandomNumber(categories, seed);
    let randArtists = getRandomNumber(artists, seed);

    setcategCol1(categories[randCateg[0]]);
    setcategCol2(categories[randCateg[1]]);
    setcategCol3(categories[randCateg[2]]);

    if (!await checkRowByCol(artists[randArtists[0]].id, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]])) {
      do {
        randArtists[0] = randArtists[0] + 1;
      } while (!await checkRowByCol(artists[randArtists[0]].id, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]]));
    }

    if (!await checkRowByCol(artists[randArtists[1]].id, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]])) {
      do {
        randArtists[1] = randArtists[1] + 1;
      } while (!await checkRowByCol(artists[randArtists[1]].id, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]]));
    }

    if (!await checkRowByCol(artists[randArtists[2]].id, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]])) {
      do {
        randArtists[2] = randArtists[2] + 1;
      } while (!await checkRowByCol(artists[randArtists[2]].id, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]]));
    }

    setartistRow1(artists[randArtists[0]].id);
    setartistRow2(artists[randArtists[1]].id);
    setartistRow3(artists[randArtists[2]].id);

    getRows(randCateg, randArtists);
  }, [categories, getRandomNumber, artists]);

  const getRows = useCallback((randCateg, randArtists) => {
    for (const child of gridRef.current.children) {
      const [row, col] = child.id.split('').map(Number);

      if (row === 0 && col !== 0) {
        const index = col - 1;

        child.innerHTML = `<span class="text-xs md:text-lg">${categories[randCateg[index]].name}</span>`
      } else if (col === 0 && row !== 0) {
        const index = row - 1;

        child.innerHTML = `<span class="text-xs md:text-lg">${artists[randArtists[index]].name}</span> <img class="size-16 md:size-32" src="${artists[randArtists[index]].images[2].url}"/>`
      } else {

      }
    }
    setLoading(false);
  }, [categories, artists]);

  const setSeed = () => {
    initRows(inputSeedRef.current.value)
  }

  useEffect(() => {
    switch (region) {
      case 'world':
        setArtists(artistWorld.filter((artist) => artist.followers.total > 3000000));
        break;
      case 'UK':
        setArtists(artistUK.filter((artist) => artist.followers.total > 500000));
        break;
      case 'FR':
        setArtists(artistFR.filter((artist) => artist.followers.total > 1000000));
        break;
      case 'rockWorld':
        setArtists(artistRockWorld.filter((artist) => artist.followers.total > 3000000));
        break;
      default:
        setArtists(artistWorld.filter((artist) => artist.followers.total > 3000000));
        break;
    }
  }, [region]);

  useEffect(() => {
    if (artists !== null) {
      initRows();
    }
  }, [initRows, artists]);

  return (
    <div className="size-full relative">
      <div className={loading ? '' : 'hidden'}>
        <div className="border border-blue-300 shadow rounded-md p-4">
          <div className="animate-pulse grid grid-cols-4 gap-4 text-white">
            <div className=""></div>
            <div className="w-20 h-6 md:w-40 md:h-12 bg-slate-700 rounded-md"></div>
            <div className="w-20 h-6 md:w-40 md:h-12 bg-slate-700 rounded-md"></div>
            <div className="w-20 h-6 md:w-40 md:h-12 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
            <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          </div>
        </div>
      </div>
      <div className={loading ? 'hidden' : ''}>
        <div className="grid grid-cols-4 gap-4 text-white" id="grid" ref={gridRef}>
          <div className="w-20 md:w-40" id="00">

          </div>
          <div className="w-20 md:w-40 text-center" id="01">

          </div>
          <div className="w-20 md:w-40 text-center" id="02">

          </div>
          <div className="w-20 md:w-40 text-center" id="03">

          </div>
          <div className="size-20 md:size-40 flex flex flex-col justify-center items-center" id="10">

          </div>
          <div className="size-20 md:size-40" id="11">
            <GridButtonModal
              artistID={artistRow1}
              categ={categCol1}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40" id="12">
            <GridButtonModal
              artistID={artistRow1}
              categ={categCol2}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40" id="13">
            <GridButtonModal
              artistID={artistRow1}
              categ={categCol3}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40 flex flex flex-col justify-center items-center" id="20">

          </div>
          <div className="size-20 md:size-40" id="21">
            <GridButtonModal
              artistID={artistRow2}
              categ={categCol1}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40" id="22">
            <GridButtonModal
              artistID={artistRow2}
              categ={categCol2}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40" id="23">
            <GridButtonModal
              artistID={artistRow2}
              categ={categCol3}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40 flex flex flex-col justify-center items-center" id="30">

          </div>
          <div className="size-20 md:size-40" id="31">
            <GridButtonModal
              artistID={artistRow3}
              categ={categCol1}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40" id="32">
            <GridButtonModal
              artistID={artistRow3}
              categ={categCol2}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
          <div className="size-20 md:size-40" id="33">
            <GridButtonModal
              artistID={artistRow3}
              categ={categCol3}
              isCoverChecked={isCoverChecked}
            ></GridButtonModal>
          </div>
        </div>
        <GridOptions
          inputSeedRef={inputSeedRef}
          setSeed={setSeed}
          region={region}
          setRegion={setRegion}
          isCoverChecked={isCoverChecked}
          setIsCoverChecked={setIsCoverChecked}
        ></GridOptions>
      </div>
    </div>
  );
}