'use strict';

import fs from 'fs';
import path from 'path';

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

function writeTurns() {
    // get API db
    const data = fs.readFileSync(
        path.join(__dirname, '..', `/api/db.json`),
        'utf-8'
    );

    // parse into obj
    const security: Security = JSON.parse(data);

    function switchFirstToLast(arr: number[]) {
        const lastTurret = arr.shift() as number;
        arr.push(lastTurret);
    }

    function message(
        _worker: typeof security.workers[number],
        _startingHour: number
    ) {
        const turretsArr = security[_worker].torrette;
        const firstTurret = security[_worker].torrette[0];

        // starting string
        const str = `${_worker.slice(0, _worker.length - 1)} ${_worker.slice(
            _worker.length - 1
        )} inizia alla torretta ${firstTurret} alle ${_startingHour.toFixed(
            2
        )}`.toUpperCase();

        let startHour = _startingHour;
        let turnsStr = '';

        // string block per turret
        for (const turret of turretsArr) {
            turnsStr += `torretta ${turret}: ${startHour.toFixed(2)} -> ${(
                startHour + 1
            ).toFixed(2)}\n`.padStart(35);
            startHour++;
        }

        // change db
        switchFirstToLast(turretsArr);

        return `${str}\n${turnsStr}\n`;
    }

    function allMessage() {
        const date = new Date().toLocaleDateString('it-IT');

        let finalStr = `🌊 PAUSE DEL ${date} 🌊\n\n`;

        for (const [i, worker] of security.workers.entries()) {
            const prop = security[worker];

            finalStr += message(worker, prop.startingHour);
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

