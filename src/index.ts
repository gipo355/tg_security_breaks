// function Ciao() {
//     this.ciao = 'ciao';
// // }

// import { Client } from 'pg';


// const client = new Client();
// client.connect();
// client.query( 'SELECT $1::text as message', [ 'Hello world!' ], ( err: any, res: any ) => {
//     console.log( err ? err.stack : res.rows[ 0 ].message ); // Hello World!
//     client.end();
// } );


// function cioa(params) {

// }

import 'dotenv-defaults/config';

console.log( process.env.KEY );

function ciao( param: string ) {
    console.log( param );
}



ciao( 'param' );






