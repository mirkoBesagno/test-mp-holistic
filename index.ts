



/* import { Admin } from "./users/admin"; */

import "reflect-metadata";
import { Main } from "mp-holistic";

import { Admin } from "./users/admin";
import { Client } from "pg";


/* const admin: Admin = new Admin(); */
const admin: Admin = new Admin();

const main = new Main('api', undefined, false);


main.expressMain.Inizializza('localhost', 8080, undefined, false);

main.postgresMain.InizializzaORM({
    dropAllTable: false,
    listaRuoli: [{
        connectionLimit: 1,
        inRole: ['ruolouno'],
        nome: 'ruolouno',
        option: {
            creaDB: false,
            creaTabelle: false,
            creaUser: true,
            isSuperUser: false,
            login: true,
        },
        password: 'ciao'
    }, {
        connectionLimit: 1,
        inRole: ['ruolodue'],
        nome: 'ruolodue',
        option: {
            creaDB: false,
            creaTabelle: false,
            creaUser: true,
            isSuperUser: false,
            login: true,
        },
        password: 'ciao'
    }],
    listaUser: [{
        connectionLimit: 1,
        inRole: ['ruolouno'],
        nome: 'user',
        option: {
            creaDB: false,
            creaTabelle: false,
            creaUser: true,
            isSuperUser: false,
            login: true
        },
        password: 'ciao'
    }]
});

export const clientPostgres = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'password',//'password', //'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
    port: 5432,
});
/* ruolouno */
export const clientPostgres_ruolouno = new Client({
    user: 'ruolouno',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'ciao',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
    port: 5432,
});
/* ruolodue */
export const clientPostgres_ruoldue = new Client({
    user: 'ruolodue',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'ciao',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
    port: 5432,
});

console.log(admin);

main.postgresMain.IstanziaORM(clientPostgres).then(() => {

    main.postgresMain.ScriviFile(__dirname);
    main.expressMain.ScriviFile(__dirname);

    main.expressMain.StartHttpServer();

    console.log("FINITO");
});







