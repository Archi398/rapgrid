import '../style/Grid.css';
import { useEffect, useRef, useMemo, useCallback, useState, useContext } from 'react';
import seedrandom from 'seedrandom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import GridButtonModal from '../components/molecules/GridButtonModal';
import GridOptions from '../components/organisms/GridOptions';
import GridLoading from '../components/atoms/GridLoading';
import GridFinish from '../components/organisms/GridFinish';
import GridPersonalOptions from '../components/organisms/GridPersonalOptions';

import { artistWorld, artistUK, artistFR, artistRockWorld } from '../data/grid/artists';
import { GlobalContext } from "../App";

export default function Grid({ isDaily, isPersonal, isShared }) {
  const { sdkGlobal, currentUserTopArtists, todaySeed } = useContext(GlobalContext);

  // if daily grid
  if (!localStorage.getItem(`lives_${todaySeed}`)) {
    localStorage.setItem(`lives_${todaySeed}`, 11)
  }
  if (!localStorage.getItem(`result_correct_${todaySeed}_all`)) {
    localStorage.setItem(`result_correct_${todaySeed}_all`, 0)
  }
  if (!localStorage.getItem(`lives_${todaySeed}`)) {
    localStorage.setItem(`lives_${todaySeed}`, 11)
  }
  if (isDaily) {
    seedrandom(todaySeed, { global: true });
  }

  const optionsToast = {
    theme: "dark",
    autoClose: 2500,
  };

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
        if (album.artists.length === 1) {
          album.tracks.items.forEach((item) => {
            if (item.artists.length === 1) {
              flag = true;
            }
          });
        } else {
          flag = true;
        }
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

  const [loading, setLoading] = useState(false);

  const [artistRow1, setartistRow1] = useState('');
  const [artistRow2, setartistRow2] = useState('');
  const [artistRow3, setartistRow3] = useState('');
  const [categCol1, setcategCol1] = useState({});
  const [categCol2, setcategCol2] = useState({});
  const [categCol3, setcategCol3] = useState({});

  const [lives, setLives] = useState(isDaily ? parseInt(localStorage.getItem(`lives_${todaySeed}`)) : 11);
  const [correctCount, setCorrectCount] = useState(isDaily ? parseInt(localStorage.getItem(`result_correct_${todaySeed}_all`)) : 0);
  const [isFindGrid, setIsFindGrid] = useState({
    11: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_11`) ? true : false,
    12: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_12`) ? true : false,
    13: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_13`) ? true : false,
    21: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_21`) ? true : false,
    22: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_22`) ? true : false,
    23: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_23`) ? true : false,
    31: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_31`) ? true : false,
    32: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_32`) ? true : false,
    33: isDaily && localStorage.getItem(`result_album_id_${todaySeed}_33`) ? true : false,
  });
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
    }
  };

  const fetchDataArtistByID = async (id) => {
    try {
      setLoading(true);
      const artist = await sdkGlobal.artists.get(id);
      return artist;
    } catch (error) {
      console.error('Error fetching search results:', error);
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
          updatedAnwsers[key].push({ artistID: artistID, name: album.name, img: album.images[2].url, date: album.release_date });
          flags[index] = true;
        }
      });
    });

    if (flags.every((flag) => flag === true)) {
      setAnwsers(prevState => { return { ...prevState, ...updatedAnwsers } });
    }

    return flags;
  };

  const getRandomNumber = useCallback((array) => {

    const arrayLength = array.length;
    const randomIndices = new Set();

    while (randomIndices.size < 3) {
      const randomNumber = Math.floor(Math.random() * arrayLength);
      randomIndices.add(randomNumber);
    }

    return Array.from(randomIndices);
  }, []);

  const initRowsShared = useCallback(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    let params = Object.fromEntries(urlParams.entries());

    // reset anwsers
    setAnwsers({});

    setcategCol1(categories.find(category => category.id === parseInt(params.categ1)));
    setcategCol2(categories.find(category => category.id === parseInt(params.categ2)));
    setcategCol3(categories.find(category => category.id === parseInt(params.categ3)));

    setartistRow1(params.artist1);
    setartistRow2(params.artist2);
    setartistRow3(params.artist3);

  }, [categories]);

  const initRows = useCallback(async () => {
    let randCateg = getRandomNumber(categories);
    let randArtists = getRandomNumber(artists);

    // reset anwsers
    setAnwsers({});

    const checkAndUpdateRow = async (index) => {
      const maxIterations = 200;
      let iterationCount = 0;

      while (true) {
        iterationCount++;
        if (iterationCount > maxIterations) {
          console.warn('Maximum iterations reached, breaking loop');
          window.location.reload();
          break;
        }

        const flags = await checkRowByCol(artists[randArtists[index]].id, index, categories[randCateg[0]], categories[randCateg[1]], categories[randCateg[2]]);

        const indices = flags.reduce((result, flag, index) => {
          if (flag === false) {
            result.push(index);
          }
          return result;
        }, []);

        let uniqueCateg = new Set(randCateg);
        let uniqueArtists = new Set(randArtists);

        for (const i of indices) {
          randCateg[i] = (randCateg[i] + 1) % categories.length;

          uniqueCateg = new Set(randCateg);

          if (uniqueCateg.size < randCateg.length) {
            do {
              randArtists[index] = (randArtists[index] + 1) % artists.length;
              uniqueArtists = new Set(randArtists);
            } while (uniqueArtists.size < randArtists.length);
          }
        }

        if (flags.every((flag) => flag === true) && (uniqueCateg.size < randCateg.length)) {
          randCateg = randCateg.map(() => Math.floor(Math.random() * categories.length));
        }

        if (flags.every((flag) => flag === true) && (uniqueCateg.size === randCateg.length)) {
          break;
        }
      }
    };


    if (isDaily) {
      if (localStorage.getItem(`categ_${todaySeed}`) !== null && localStorage.getItem(`artists_${todaySeed}`) !== null) {
        randCateg = JSON.parse(localStorage.getItem(`categ_${todaySeed}`))
        randArtists = JSON.parse(localStorage.getItem(`artists_${todaySeed}`))
      } else {
        try {
          for (let i = 0; i < 3; i++) {
            await checkAndUpdateRow(i);
          }
        } catch (error) {
          console.error("Invalid checkAndUpdateRow", error);
        }
      }
    } else {
      try {
        for (let i = 0; i < 3; i++) {
          await checkAndUpdateRow(i);
        }
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

    if (isDaily && (!localStorage.getItem(`categ_${todaySeed}`) && !localStorage.getItem(`artists_${todaySeed}`))) {
      localStorage.setItem(`categ_${todaySeed}`, JSON.stringify(randCateg));
      localStorage.setItem(`artists_${todaySeed}`, JSON.stringify(randArtists));
    }

  }, [categories, getRandomNumber, artists, isDaily, todaySeed]);

  const setRows = async () => {
    if (
      artists &&
      artistRow1 &&
      artistRow2 &&
      artistRow3 &&
      categCol1 &&
      categCol2 &&
      categCol3
    ) {
      const artistRows = [artistRow1, artistRow2, artistRow3];
      const categCols = [categCol1, categCol2, categCol3];

      for (const child of gridRef.current.children) {
        const [row, col] = child.id.split('').map(Number);

        if (row === 0 && col !== 0) {
          const categ = categCols[col - 1];
          child.innerHTML = `<span class="text-xs md:text-lg" data-id="${categ.id}">${categ.name}</span>`;
        } else if (col === 0 && row !== 0) {
          const artistId = artistRows[row - 1];
          let artist = {};
          if (isShared) {
            artist = await fetchDataArtistByID(artistId);
          } else {
            artist = artists.find(artist => artist.id === artistId)
          }
          child.innerHTML = `<span class="text-xs md:text-base" data-id="${artist.id}">${artist.name}</span> <img class="size-12 md:size-28 rounded" src="${artist.images[2].url}"/>`;
        }
      }
      setLoading(false);
    }
  };

  async function shareToday() {
    const gridResult = {};
    for (let i = 1; i <= 3; i++) {
      for (let j = 1; j <= 3; j++) {
        gridResult[`${i}${j}`] = isFindGrid[`${i}${j}`] ? "🟩" : "⬜";
      }
    }

    let textTitle = 'Ton résultat';
    if (isDaily) {
      textTitle = `Rap grid du ${todaySeed}`;
    } else if (isPersonal) {
      textTitle = 'Ton Rapgrid perso';
    }

    let linkShare = 'https://rapgrid.vercel.app/rapgrid/day';
    if (isDaily) {
      linkShare = `https://rapgrid.vercel.app/rapgrid/day`;
    } else if (isPersonal) {
      const listArtists = [
        document.getElementById("10").querySelector("span").getAttribute("data-id"),
        document.getElementById("20").querySelector("span").getAttribute("data-id"),
        document.getElementById("30").querySelector("span").getAttribute("data-id"),
      ];

      const listCategs = [
        document.getElementById("01").querySelector("span").getAttribute("data-id"),
        document.getElementById("02").querySelector("span").getAttribute("data-id"),
        document.getElementById("03").querySelector("span").getAttribute("data-id"),
      ];


      const params = new URLSearchParams();
      listArtists.forEach((artist, index) => params.append(`artist${index + 1}`, artist));
      listCategs.forEach((categ, index) => params.append(`categ${index + 1}`, categ));

      linkShare = `${process.env.REACT_APP_BASE_URL}/rapgrid/shared?${params.toString()}`;
    }

    const textToCopy = `${textTitle} :

${correctCount}/9 Correctes

${gridResult["11"]}${gridResult["12"]}${gridResult["13"]}
${gridResult["21"]}${gridResult["22"]}${gridResult["23"]}
${gridResult["31"]}${gridResult["32"]}${gridResult["33"]}

${linkShare}`;

    try {
      await navigator.clipboard.writeText(textToCopy);
      toast.success("Copié dans le presse-papier !", optionsToast);
      return true;
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
      return false;
    }
  }

  useEffect(() => {
    setcategCol1({});
    setcategCol2({});
    setcategCol3({});

    setartistRow1('');
    setartistRow2('');
    setartistRow3('');

    if (isPersonal) {
      setArtists(currentUserTopArtists);
    } else {
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
    }
  }, [isDaily, isPersonal, isShared, region, currentUserTopArtists]);

  // useEffect for initRows
  useEffect(() => {
    const fetchRows = async () => {
      if (isShared) {
        await initRowsShared();
      } else {
        if (artists !== null) {
          await initRows();
        }
      }
    };

    fetchRows();
  }, [isDaily, isPersonal, isShared, initRowsShared, initRows, artists]);

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
      //console.log(anwsers);
    }
  }, [isDaily, todaySeed, anwsers]);

  // useEffect for getRows
  useEffect(() => {
    setRows();
  }, [artists, artistRow1, artistRow2, artistRow3, categCol1, categCol2, categCol3]);

  return (
    <div className="relative">
      <GridLoading loading={loading ? '' : 'hidden'}></GridLoading>
      <div className={`flex flex-col ${loading ? 'hidden' : ''}`}>
        <div className="grid grid-cols-4 gap-4 text-white" id="grid" ref={gridRef}>
          {gridDiv.map(({ divID, isButton, artistID, categ, classlist }) => (
            isButton ? (
              <div className={classlist} id={divID} key={divID}>
                <GridButtonModal
                  divID={divID}
                  setLives={setLives}
                  setCorrectCount={setCorrectCount}
                  setIsFindGrid={setIsFindGrid}
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
          isPersonal
            ?
            <GridPersonalOptions />
            :
            <></>
        }
        <GridFinish
          lives={lives}
          setLives={setLives}
          correctCount={correctCount}
          isFindGrid={isFindGrid}
          shareToday={shareToday}
          isDaily={isDaily}
          anwsers={anwsers}
        ></GridFinish>
        {
          isPersonal || isDaily || isShared
            ?
            <></>
            :
            <GridOptions
              region={region}
              setRegion={setRegion}
              isCoverChecked={isCoverChecked}
              setIsCoverChecked={setIsCoverChecked}
            ></GridOptions>
        }
      </div>
      <ToastContainer />
    </div>
  );
}