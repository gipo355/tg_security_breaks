'use strict';

import fs from 'fs';
import path from 'path';

/**
 *  bot sends message every day at 0800 with
 *
 *      1- current day
 *      2- beach: levante, ponente
 *      3- levante 1, levante 2 / ponente 1, ponente 2 hours per turret
 *
 *          return: where do turns start, at what hour, every position break
 *
 *      every day, levante 1 and levante 2 start + 1 position
 */

/**
 *  example format:
 *
 *  25/06/2022
 *  LEVANTE 1 INIZIA ALLA TORRETTA 15 ALLE ORE 12:00
 *      torretta 15: 12.00 -> 13.00
 *      torretta 16: 13.00 -> 14.00
 *      torretta 17: 14.00 -> 15.00
 *      torretta 18: 15.00 -> 16.00
 *      torretta 19: 16.00 -> 17.00

 *  26/06/2022
 *  LEVANTE 1 INIZIA ALLA TORRETTA 16 ALLE ORE 12:00
 *      torretta 16: 12.00 -> 13.00
 *      torretta 17: 13.00 -> 14.00
 *      torretta 18: 14.00 -> 15.00
 *      torretta 18: 15.00 -> 16.00
 *      torretta 15: 16.00 -> 17.00
 */

interface Security {
    workers: ['levante1', 'levante2', 'ponente1', 'ponente2'];
    levante1: {
        torrette: number[];
        startingHour: number;
    };
    levante2: {
        torrette: number[];
        startingHour: number;
    };
    ponente1: {
        torrette: number[];
        startingHour: number;
    };
    ponente2: {
        torrette: number[];
        startingHour: number;
    };
}

// ! BUG IF I WANT TO CHANGE AND REMOVE A WORKER IT FUCKS UP EVERYTHING BECAUSE THEY ARE CONST,
// ! got to fix both the interface and the initialize db below
function writeTurns() {
    const data = fs.readFileSync(
        path.join(__dirname, '..', `/api/db.json`),
        'utf-8'
    );
    const security: Security = JSON.parse(data);
    // console.log(sec);

    // const security: Security = {
    //     workers: ['levante1', 'levante2', 'ponente1', 'ponente2'],
    //     levante1: {
    //         torrette: [9, 10, 11, 12, 13, 14],
    //         startingHour: 11,
    //     },
    //     levante2: {
    //         torrette: [15, 16, 17, 18, 19],
    //         startingHour: 12,
    //     },
    //     ponente1: {
    //         torrette: [28, 29, 30, 31, 32, 33],
    //         startingHour: 11,
    //     },
    //     ponente2: {
    //         torrette: [34, 35, 36, 37, 38, 39],
    //         startingHour: 11,
    //     },
    // };

    // ! objective, return a string

    function switchFirstToLast(arr: number[]) {
        const lastTurret = arr.shift() as number;
        arr.push(lastTurret);
    }

    function message(
        _worker: typeof security.workers[number],
        _startingHour: number
    ) {
        // set useful vars
        const turretsArr = security[_worker].torrette;
        const firstTurret = security[_worker].torrette[0];

        // starting string
        const str = `${_worker.slice(0, _worker.length - 1)} ${_worker.slice(
            _worker.length - 1
        )} inizia alla torretta ${firstTurret} alle ${_startingHour.toFixed(
            2
        )}`.toUpperCase();

        // turns string
        let startHour = _startingHour;
        let turnsStr = '';
        for (const turret of turretsArr) {
            // console.log(turret);
            turnsStr += `torretta ${turret}: ${startHour.toFixed(2)} -> ${(
                startHour + 1
            ).toFixed(2)}\n`.padStart(35);
            startHour++;
        }

        // console.log(str);
        // console.log(turnsStr);

        switchFirstToLast(turretsArr);
        // console.log(turretsArr);

        // return finalStr;
        return `${str}\n${turnsStr}\n`;
    }

    function allMessage() {
        const date = new Date().toLocaleDateString('it-IT');
        // console.log(date, '\n');
        let finalStr = `${date}\n\n`;
        for (const [i, worker] of security.workers.entries()) {
            // console.log(security[`levante${i + 1}`].startingHour);
            // console.log(i, worker);
            // const beach = security[worker];
            // console.log(beach.startingHour);

            // console.log(security['levante1']);

            const prop = security[worker];
            // console.log(prop);
            // console.log(prop.startingHour);
            finalStr += message(worker, prop.startingHour);
            // console.log(worker);
        }
        console.log(finalStr);
        fs.writeFileSync(
            path.join(__dirname, '..', '/api/db.json'),
            JSON.stringify(security)
        );
        return finalStr;
    }
    return allMessage();
}

function initializeDb() {
    const security: Security = {
        workers: ['levante1', 'levante2', 'ponente1', 'ponente2'],
        levante1: {
            torrette: [9, 10, 11, 12, 13, 14],
            startingHour: 11,
        },
        levante2: {
            torrette: [15, 16, 17, 18, 19],
            startingHour: 12,
        },
        ponente1: {
            torrette: [28, 29, 30, 31, 32, 33],
            startingHour: 11,
        },
        ponente2: {
            torrette: [34, 35, 36, 37, 38, 39],
            startingHour: 11,
        },
    };
    fs.writeFileSync(
        path.join(__dirname, '..', '/api/db.json'),
        JSON.stringify(security)
    );
}

export { writeTurns as default, initializeDb };
// writeTurns();
// initializeDb();
