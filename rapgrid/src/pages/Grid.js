import '../style/Grid.css';
import { useEffect, useRef, useMemo, useCallback, useState } from 'react';
import seedrandom from 'seedrandom';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

import GridButtonModal from '../components/organisms/GridButtonModal';

//const sdk = SpotifyApi.withUserAuthorization("7b1532e31e4f4ab28f471527aa4ab785", "https://localhost:3000");
const sdk = SpotifyApi.withClientCredentials("7b1532e31e4f4ab28f471527aa4ab785", "4099a973c7084a31972ed8a44c878796");

const items = await sdk.search("genre:hip-hop", ["artist"], "US", 50);

const artists = items.artists.items;
//artistsSort.sort((a, b) => b.followers.total - a.followers.total);

export default function Grid() {
    const categories = useMemo(() => [
        {
            id: 1,
            name: "Album between 2006 and 2024"
        },
        {
            id: 2,
            name: "Album between 1991 and 2005"
        },
        {
            id: 3,
            name: "Album beginning with a vowel"
        },
        {
            id: 4,
            name: "One word title (Ignore 'the')"
        },
        {
            id: 5,
            name: "Album with more than 16 tracks"
        },
        {
            id: 6,
            name: "Album with 16 tracks or less"
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

    const [artistRow1, setartistRow1] = useState('');
    const [artistRow2, setartistRow2] = useState('');
    const [artistRow3, setartistRow3] = useState('');
    const [categCol1, setcategCol1] = useState(0);
    const [categCol2, setcategCol2] = useState(0);
    const [categCol3, setcategCol3] = useState(0);

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

    const getRandomNumber = useCallback((array) => {
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

    const getRows = useCallback(() => {
        const randCateg = getRandomNumber(categories);
        const randArtists = getRandomNumber(artists);

        for (const child of gridRef.current.children) {
            const [row, col] = child.id.split('').map(Number);

            if (row === 0 && col !== 0) {
                const index = col - 1;
                switch (col) {
                    case 1:
                        setcategCol1(categories[randCateg[index]].id);
                        break;
                    case 2:
                        setcategCol2(categories[randCateg[index]].id);
                        break;
                    case 3:
                        setcategCol3(categories[randCateg[index]].id);
                        break;
                    default:
                        break;
                }
                child.innerHTML = `${categories[randCateg[index]].name}`
            } else if (col === 0 && row !== 0) {
                const index = row - 1;
                switch (row) {
                    case 1:
                        setartistRow1(artists[randArtists[index]].id);
                        break;
                    case 2:
                        setartistRow2(artists[randArtists[index]].id);
                        break;
                    case 3:
                        setartistRow3(artists[randArtists[index]].id);
                        break;
                    default:
                        break;
                }

                child.innerHTML = `<div> <h1>${artists[randArtists[index]].name}</h1> <img class="size-32" src="${artists[randArtists[index]].images[2].url}"/> </div>`
            } else {

            }
        }
    }, [categories, getRandomNumber]);

    useEffect(() => {
        getRows();
    }, [getRows])

    return (
        <div className="size-full">
            <div className="grid grid-cols-4 gap-4 text-white" id="grid" ref={gridRef}>
                <div className="w-40" id="00">

                </div>
                <div className="w-40 text-center" id="01">

                </div>
                <div className="w-40 text-center" id="02">

                </div>
                <div className="w-40 text-center" id="03">

                </div>
                <div className="size-40 flex justify-center text-center" id="10">

                </div>
                <div className="size-40" id="11">
                    <GridButtonModal
                        artistID={artistRow1}
                        categID={categCol1}
                    ></GridButtonModal>
                </div>
                <div className="size-40" id="12">
                    <GridButtonModal
                        artistID={artistRow1}
                        categID={categCol2}
                    ></GridButtonModal>
                </div>
                <div className="size-40" id="13">
                    <GridButtonModal
                        artistID={artistRow1}
                        categID={categCol3}
                    ></GridButtonModal>
                </div>
                <div className="size-40 flex justify-center text-center" id="20">

                </div>
                <div className="size-40" id="21">
                    <GridButtonModal
                        artistID={artistRow2}
                        categID={categCol1}
                    ></GridButtonModal>
                </div>
                <div className="size-40" id="22">
                    <GridButtonModal
                        artistID={artistRow2}
                        categID={categCol2}
                    ></GridButtonModal>
                </div>
                <div className="size-40" id="23">
                    <GridButtonModal
                        artistID={artistRow2}
                        categID={categCol3}
                    ></GridButtonModal>
                </div>
                <div className="size-40 flex justify-center text-center" id="30">

                </div>
                <div className="size-40" id="31">
                    <GridButtonModal
                        artistID={artistRow3}
                        categID={categCol1}
                    ></GridButtonModal>
                </div>
                <div className="size-40" id="32">
                    <GridButtonModal
                        artistID={artistRow3}
                        categID={categCol2}
                    ></GridButtonModal>
                </div>
                <div className="size-40" id="33">
                    <GridButtonModal
                        artistID={artistRow3}
                        categID={categCol3}
                    ></GridButtonModal>
                </div>
            </div>
        </div>
    );
}