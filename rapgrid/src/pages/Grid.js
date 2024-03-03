import '../style/Grid.css';
import { useEffect, useRef, useMemo, useCallback, useState, useContext } from 'react';
import seedrandom from 'seedrandom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GridButtonModal from '../components/molecules/GridButtonModal';
import GridOptions from '../components/organisms/GridOptions';
import GridLoading from '../components/atoms/GridLoading';
import GridFinish from '../components/organisms/GridFinish';

import { artistWorld, artistUK, artistFR, artistRockWorld } from '../data/grid/artists';
import { GlobalContext } from "../App";

export default function Grid({ isDaily, isPersonal }) {

  const { sdkGlobal, currentUserTopArtists } = useContext(GlobalContext);

  const categories = useMemo(() => [
    {
      id: 1,
      name: "Album entre 2006 et 2024",
      check: function (album) {
        return parseInt(album.release_date.split('-')[0]) >= 2006 && parseInt(album.release_date.split('-')[0]) <= 2024;
      },
    },
    {
      id: 2,
      name: "Album entre 1991 et 2005",
      check: function (album) {
        return parseInt(album.release_date.split('-')[0]) >= 1991 && parseInt(album.release_date.split('-')[0]) <= 2005;
      },
    },
    {
      id: 3,
      name: "Album commençant par une voyelle",
      check: function (album) {
        return "aeiouy".includes(album.name.charAt(0).toLowerCase());
      },
    },
    {
      id: 4,
      name: "Titre en un mot",
      check: function (album) {
        const oneWordRegex = /^[A-Za-z]+$/;
        return oneWordRegex.test(album.name);
      },
    },
    {
      id: 5,
      name: "Album de plus de 16 titres",
      check: function (album) {
        return album.total_tracks > 16;;
      },
    },
    {
      id: 6,
      name: "Album de 16 titres ou moins",
      check: function (album) {
        return album.total_tracks <= 16;;
      },
    },
    {
      id: 7,
      name: "Album sans featuring",
      check: function (album) {
        let flag = false;
        album.tracks.items.forEach((item) => {
          if (item.artists.length > 1) {
            flag = true;
          }
        });
        return flag;
      },
    },
    {
      id: 8,
      name: "Album dont le nom à au moins 3 mots",
      check: function (album) {
        const nameWithoutParentheses = album.name.replace(/\(.*?\)/g, '');
        const words = nameWithoutParentheses.trim().split(/\s+/);
        return words.length >= 3;
      },
    },
    {
      id: 9,
      name: "Album avec un morceau de plus de 5 min",
      check: function (album) {
        let flag = false;
        album.tracks.items.forEach((item) => {
          if (item.duration_ms > 300000) {
            flag = true;
          }
        });
        return flag;
      },
    },
    // {
    //     id: 7,
    //     name: "Album featuring Kanye West"
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
  const [anwsers, setAnwsers] = useState({});

  const gridDiv = [
    { divID: "00", isButton: false, classlist: "w-16 md:w-26" },
    { divID: "01", isButton: false, classlist: "w-16 md:w-36 text-center flex items-center justify-center" },
    { divID: "02", isButton: false, classlist: "w-16 md:w-36 text-center flex items-center justify-center" },
    { divID: "03", isButton: false, classlist: "w-16 md:w-36 text-center flex items-center justify-center" },
    { divID: "10", isButton: false, classlist: "size-16 md:size-36 flex flex flex-col items-center" },
    { divID: "11", isButton: true, artistID: artistRow1, categ: categCol1, classlist: "size-16 md:size-36" },
    { divID: "12", isButton: true, artistID: artistRow1, categ: categCol2, classlist: "size-16 md:size-36" },
    { divID: "13", isButton: true, artistID: artistRow1, categ: categCol3, classlist: "size-16 md:size-36" },
    { divID: "20", isButton: false, classlist: "size-16 md:size-36 flex flex flex-col items-center" },
    { divID: "21", isButton: true, artistID: artistRow2, categ: categCol1, classlist: "size-16 md:size-36" },
    { divID: "22", isButton: true, artistID: artistRow2, categ: categCol2, classlist: "size-16 md:size-36" },
    { divID: "23", isButton: true, artistID: artistRow2, categ: categCol3, classlist: "size-16 md:size-36" },
    { divID: "30", isButton: false, classlist: "size-16 md:size-36 flex flex flex-col items-center" },
    { divID: "31", isButton: true, artistID: artistRow3, categ: categCol1, classlist: "size-16 md:size-36" },
    { divID: "32", isButton: true, artistID: artistRow3, categ: categCol2, classlist: "size-16 md:size-36" },
    { divID: "33", isButton: true, artistID: artistRow3, categ: categCol3, classlist: "size-16 md:size-36" },
  ];

  const [artists, setArtists] = useState(null);
  const [region, setRegion] = useState(isPersonal ? 'personal' : 'FR');
  const [isCoverChecked, setIsCoverChecked] = useState(true);

  // if daily grid
  const today = new Date();
  const todaySeed = ((today.getDate() < 10) ? ("0" + today.getDate()) : today.getDate()) + '/' + ((today.getMonth() + 1 < 10) ? ("0" + (today.getMonth() + 1)) : (today.getMonth() + 1)) + '/' + today.getFullYear();
  if (!localStorage.getItem(`lives_${todaySeed}`)) {
    localStorage.setItem(`lives_${todaySeed}`, 11)
  }
  if (!localStorage.getItem(`result_correct_${todaySeed}_all`)) {
    localStorage.setItem(`result_correct_${todaySeed}_all`, 0)
  }
  const [lives, setLives] = useState(localStorage.getItem(`lives_${todaySeed}`));
  if (!localStorage.getItem(`lives_${todaySeed}`)) {
    localStorage.setItem(`lives_${todaySeed}`, 11)
  }

  const fetchDataAlbumByArtist = async (id) => {
    try {
      setLoading(true);
      const artistAlbums = await sdkGlobal.artists.albums(id, "album", "", 50);
      let albumsPromises = [];
      artistAlbums.items.forEach((item) => {
        const albumPromise = sdkGlobal.albums.get(item.id, "", 50);
        albumsPromises.push(albumPromise);
      });
      const albums = await Promise.all(albumsPromises);
      return albums;
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      //setLoading(false);
    }
  };

  const checkRowByCol = async (artistID, artistIndex, categ1, categ2, categ3) => {
    const arrayArtistAlbums = await fetchDataAlbumByArtist(artistID);

    let flags = [false, false, false];
    const categs = [categ1, categ2, categ3];

    const updatedAnwsers = { ...anwsers };

    arrayArtistAlbums.forEach(album => {
      categs.forEach((categ, index) => {
        if (categ.check(album)) {
          const key = `${artistIndex + 1}${index + 1}`;
          if (!updatedAnwsers[key]) {
            updatedAnwsers[key] = [];
          }
          updatedAnwsers[key].push({ name: album.name, img: album.images[2].url, date: album.release_date });
          flags[index] = true;
        }
      });
    });

    if (flags.every((flag) => flag === true)) {
      setAnwsers(prevState => { return { ...prevState, ...updatedAnwsers } });
    }

    return flags;
  };

  const getRandomNumber = useCallback((array, seed) => {
    if (seed) {
      seedrandom(seed, { global: true });
    }

    const arrayLength = array.length;
    const randomIndices = new Set();

    while (randomIndices.size < 3) {
      const randomNumber = Math.floor(Math.random() * arrayLength);
      randomIndices.add(randomNumber);
    }

    return Array.from(randomIndices);
  }, []);

  const initRows = useCallback(async (seed) => {
    let randCateg = getRandomNumber(categories, seed);
    let randArtists = getRandomNumber(artists, seed);

    //reset anwsers
    setAnwsers({});

    const checkAndUpdateRow = async (index) => {
      const uniqueCateg = new Set(randCateg);
      const counters = new Array(randCateg.length).fill(0);
      const maxIterations = 200;
      let iterationCount = 0;

      while (true) {
        iterationCount++;
        if (iterationCount > maxIterations) {
          console.warn('Maximum iterations reached, breaking loop');
          break;
        }

        const flags = await checkRowByCol(artists[randArtists[index]].id, index, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]]);

        const indices = flags.reduce((result, flag, index) => {
          if (flag === false) {
            result.push(index);
          }
          return result;
        }, []);


        const maxIterations2 = 50;
        let iterationCount2 = 0;

        for (const i of indices) {
          do {
            if (iterationCount2++ > maxIterations2) {
              console.warn('Maximum iterations reached, breaking loop');
              break;
            }

            randCateg[i]++;
            counters[i]++;
            if (randCateg[i] >= categories.length) {
              randCateg[i] = 0;
            }
            if (counters[i] >= categories.length) {
              randArtists[index] = (randArtists[index] + 1) % artists.length;
              counters[i] = 0;
            }

            uniqueCateg.delete(randCateg[i]);
          } while (uniqueCateg.has(randCateg[i]));
          uniqueCateg.add(randCateg[i]);
        }

        if (flags.every((flag) => flag === true)) {
          break;
        }
      }
    };

    if (isDaily) {
      if (localStorage.getItem(`randCateg_${todaySeed}`) !== null && localStorage.getItem(`randArtists_${todaySeed}`) !== null) {
        randCateg = JSON.parse(localStorage.getItem(`randCateg_${todaySeed}`))
        randArtists = JSON.parse(localStorage.getItem(`randArtists_${todaySeed}`))
      } else {
        try {
          await Promise.all([
            checkAndUpdateRow(0),
            checkAndUpdateRow(1),
            checkAndUpdateRow(2)
          ]);
        } catch (error) {
          console.error("Invalid checkAndUpdateRow", error);
        }
      }
    } else {
      try {
        await Promise.all([
          checkAndUpdateRow(0),
          checkAndUpdateRow(1),
          checkAndUpdateRow(2)
        ]);
      } catch (error) {
        console.error("Invalid checkAndUpdateRow", error);
      }
    }

    setcategCol1(categories[randCateg[0]]);
    setcategCol2(categories[randCateg[1]]);
    setcategCol3(categories[randCateg[2]]);

    setartistRow1(artists[randArtists[0]].id);
    setartistRow2(artists[randArtists[1]].id);
    setartistRow3(artists[randArtists[2]].id);

    getRows(randCateg, randArtists);
  }, [categories, getRandomNumber, artists]);

  const getRows = useCallback((randCateg, randArtists) => {
    if (isDaily && (!localStorage.getItem(`randCateg_${todaySeed}`) && !localStorage.getItem(`randArtists_${todaySeed}`))) {
      localStorage.setItem(`randCateg_${todaySeed}`, JSON.stringify(randCateg))
      localStorage.setItem(`randArtists_${todaySeed}`, JSON.stringify(randArtists))
    }

    for (const child of gridRef.current.children) {
      const [row, col] = child.id.split('').map(Number);

      if (row === 0 && col !== 0) {
        const index = col - 1;

        child.innerHTML = `<span class="text-xs md:text-lg">${categories[randCateg[index]].name}</span>`
      } else if (col === 0 && row !== 0) {
        const index = row - 1;

        child.innerHTML = `<span class="text-xs md:text-base">${artists[randArtists[index]].name}</span> <img class="size-12 md:size-28 rounded" src="${artists[randArtists[index]].images[2].url}"/>`
      } else {

      }
    }
    setLoading(false);
  }, [isDaily, categories, artists, todaySeed]);

  async function share(event) {
    const currentElement = event.target;

    const gridResult = {};
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        gridResult[`${i}${j}`] = "⬜";
      }
    }

    for (const key in localStorage) {
      if (Object.prototype.hasOwnProperty.call(localStorage, key)) {
        if (key.includes(`result_album_id_${todaySeed}_`)) {
          const index = key.split('_')[4];
          gridResult[index] = "🟩";
        }
      }
    }

    const correctCount = localStorage.getItem(`result_correct_${todaySeed}_all`) || '0';
    const textToCopy = `Rap grid For ${todaySeed}:

${correctCount}/9 Correct

${gridResult["11"]}${gridResult["12"]}${gridResult["13"]}
${gridResult["21"]}${gridResult["22"]}${gridResult["23"]}
${gridResult["31"]}${gridResult["32"]}${gridResult["33"]}

https://rapgrid.vercel.app/gridrap/day`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      currentElement.innerHTML = "Copié !";
      return true;
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
      return false;
    }
  }

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
        setArtists(artistFR.filter((artist) => artist.followers.total > 450000));
        break;
      case 'rockWorld':
        setArtists(artistRockWorld.filter((artist) => artist.followers.total > 3000000));
        break;
      case 'personal':
        setArtists(currentUserTopArtists);
        break;
      default:
        setArtists(artistWorld.filter((artist) => artist.followers.total > 3000000));
        break;
    }
  }, [region, currentUserTopArtists]);

  useEffect(() => {
    if (artists !== null) {
      const initSeed = isDaily ? todaySeed : '';
      initRows(initSeed);
    }
  }, [initRows, artists, isDaily, todaySeed]);

  // remove yesterday localStorage
  useEffect(() => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdaySeed = yesterday.getDate() + '/' + ((yesterday.getMonth() + 1 < 10) ? ("0" + (yesterday.getMonth() + 1)) : (yesterday.getMonth() + 1)) + '/' + yesterday.getFullYear();

    Object.keys(localStorage).forEach(key => {
      if (key.includes(yesterdaySeed)) {
        localStorage.removeItem(key);
      }
    });
  }, []);

  useEffect(() => {
    if (Object.keys(anwsers).length === 9) {
      if (isDaily) {
        localStorage.setItem(`anwsers_${todaySeed}`, JSON.stringify(anwsers));
      }
      console.log(anwsers);
    }
  }, [isDaily, todaySeed, anwsers]);

  return (
    <div className="size-full relative">
      <GridLoading loading={loading ? '' : 'hidden'}></GridLoading>
      <div className={`flex flex-col ${loading ? 'hidden' : ''}`}>
        <div className="grid grid-cols-4 gap-4 text-white" id="grid" ref={gridRef}>
          {gridDiv.map(({ divID, isButton, artistID, categ, classlist }) => (
            isButton ? (
              <div className={classlist} id={divID} key={divID}>
                <GridButtonModal
                  divID={divID}
                  todaySeed={todaySeed}
                  setLives={setLives}
                  isDaily={isDaily}
                  artistID={artistID}
                  categ={categ}
                  isCoverChecked={isCoverChecked}
                ></GridButtonModal>
              </div>
            )
              : (
                <div className={classlist} id={divID} key={divID}></div>
              )
          ))}
        </div>
        {
          isDaily ?
            <GridFinish
              lives={lives}
              setLives={setLives}
              share={share}
              todaySeed={todaySeed}
              isDaily={isDaily}
              anwsers={anwsers}
            >
            </GridFinish>
            :
            (
              isPersonal
                ?
                <></>
                :
                <GridOptions
                  inputSeedRef={inputSeedRef}
                  setSeed={setSeed}
                  region={region}
                  setRegion={setRegion}
                  isCoverChecked={isCoverChecked}
                  setIsCoverChecked={setIsCoverChecked}
                ></GridOptions>
            )

        }
      </div>
      <ToastContainer />
    </div>
  );
}