"use strict";
// function Ciao() {
//     this.ciao = 'ciao';
// // }
Object.defineProperty(exports, "__esModule", { value: true });
// import { Client } from 'pg';
// const client = new Client();
// client.connect();
// client.query( 'SELECT $1::text as message', [ 'Hello world!' ], ( err: any, res: any ) => {
//     console.log( err ? err.stack : res.rows[ 0 ].message ); // Hello World!
//     client.end();
// } );
// function cioa(params) {
// }
require("dotenv-defaults/config");
console.log(process.env.KEY);
function ciao(param) {
    console.log(param);
}
ciao('param');
