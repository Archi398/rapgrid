import '../style/Grid.css';
import { useEffect, useRef, useMemo, useCallback } from 'react';
import seedrandom from 'seedrandom';

export default function Grid() {
    const availableRow = useMemo(() => [
        {
            id: 1,
            name: "Album between 2006 and 2023"
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
        {
            id: 7,
            name: "Top 10 Billboard album"
        },
        {
            id: 8,
            name: "Mixtape"
        },
        {
            id: 9,
            name: "Album featuring Kanye West"
        }

    ], []);
    const gridRef = useRef(null);

    const getRandomNumberForDay = useCallback(() => {
        const today = new Date();
        const seed = today.getFullYear() + '/' + today.getMonth() + '/' + today.getDate();
        seedrandom(seed, { global: true });

        const availableRowLength = availableRow.length;

        let randomNumber1 = Math.floor(Math.random() * availableRowLength);
        let randomNumber2;
        do {
            randomNumber2 = Math.floor(Math.random() * availableRowLength);
        } while (randomNumber2 === randomNumber1);
        let randomNumber3;
        do {
            randomNumber3 = Math.floor(Math.random() * availableRowLength);
        } while (randomNumber3 === randomNumber1 || randomNumber3 === randomNumber2);

        return [randomNumber1, randomNumber2, randomNumber3];
    }, [availableRow]);

    const getRowsOfDay = useCallback(() => {
        const randOfDay = getRandomNumberForDay();
        for (const child of gridRef.current.children) {
            const [row, col] = child.id.split('').map(Number);;

            if (row === 0 && col !== 0) {
                const index = col - 1;
                child.innerHTML = `${availableRow[randOfDay[index]].name}`
            } else {
                child.innerHTML = `row : ${row} <br> col : ${col}`
            }
        }
    }, [availableRow, getRandomNumberForDay]);


    useEffect(() => {
        getRowsOfDay();
    }, [getRowsOfDay])

    return (
        <div className="grid grid-cols-4 gap-24 text-white" id="grid" ref={gridRef}>
            <div className="border-solid border-2 border-sky-500" id="00"></div>
            <div className="border-solid border-2 border-sky-500" id="01"></div>
            <div className="border-solid border-2 border-sky-500" id="02"></div>
            <div className="border-solid border-2 border-sky-500" id="03"></div>
            <div className="border-solid border-2 border-sky-500" id="10"></div>
            <div className="border-solid border-2 border-sky-500" id="11"></div>
            <div className="border-solid border-2 border-sky-500" id="12"></div>
            <div className="border-solid border-2 border-sky-500" id="13"></div>
            <div className="border-solid border-2 border-sky-500" id="20"></div>
            <div className="border-solid border-2 border-sky-500" id="21"></div>
            <div className="border-solid border-2 border-sky-500" id="22"></div>
            <div className="border-solid border-2 border-sky-500" id="23"></div>
            <div className="border-solid border-2 border-sky-500" id="30"></div>
            <div className="border-solid border-2 border-sky-500" id="31"></div>
            <div className="border-solid border-2 border-sky-500" id="32"></div>
            <div className="border-solid border-2 border-sky-500" id="33"></div>
        </div>
    );
}