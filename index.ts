



/* import { Admin } from "./users/admin"; */

import "reflect-metadata";
import { Main } from "mp-holistic";

import { Admin } from "./users/admin";
import { Client, Pool } from "pg";
import { Compagno } from "./users/compagno";
import { Gruppo } from "./users/gruppo";
import { Incontro } from "./users/incontro";
import { Partecipa } from "./users/utility/partecipa";


/* const admin: AdPoolmin = new Admin(); */
const admin: Admin = new Admin();
const compagno: Compagno = new Compagno();
const gruppo: Gruppo = new Gruppo();
const incontro: Incontro = new Incontro();
const partecipa: Partecipa = new Partecipa();

const main = new Main('api', undefined, false);


main.expressMain.Inizializza('localhost', 8080, undefined, false, true);

main.postgresMain.InizializzaORM({
    dropAllTable: true,
    /* listaRuoli: [{
        connectionLimit: 1,
        inRole: ['ruolouno'],
        nome: 'ruolouno',
        option: {
            creaDB: false,
            creaTabelle: false,
            creaUser: true,
            isSuperUser: false,
            login: true
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
    }] */
});

export const clientPostgres = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'postgres',//'password', //'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
    port: 5432,
});
/* ruolouno */
/* export const clientPostgres_ruolouno = new Client({
    user: 'ruolouno',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'ciao',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
    port: 5432,
}); */
/* ruolodue */
/* try {
    const clientPostgres_ruolodue = new Client({
        user: 'ruolodue',
        host: 'localhost',
        database: 'test-mp-holistic',
        password: 'ciao',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
        port: 5432,
    });
    clientPostgres_ruolodue.connect();
    console.log(clientPostgres_ruolodue);
} catch (error) {
    console.log(error);
}
try {
    const clientPostgres_ruolotre = new Client({
        user: 'ruolodue',
        host: 'localhost',
        database: 'test-mp-holistic',
        password: 'ciao',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
        port: 5432,
    });
    clientPostgres_ruolotre.connect();
    console.log(clientPostgres_ruolotre);
} catch (error) {
    console.log(error);
}
try {
    const clientPostgres_ruoloquattro = new Client({
        user: 'ruolodue',
        host: 'localhost',
        database: 'test-mp-holistic',
        password: 'ciao',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
        port: 5432,
    });
    clientPostgres_ruoloquattro.connect();
    console.log(clientPostgres_ruoloquattro);
} catch (error) {
    console.log(error);
} */

export const pool = new Pool({
    user: 'ruolodue',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'ciao',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
    port: 5432,
    max: 1,
    connectionTimeoutMillis: 300,
    idleTimeoutMillis: 300
});

/* clientPostgres_ruolouno.connect();
clientPostgres_ruolodue.connect(); */

console.log(admin, compagno,gruppo,incontro,partecipa);

main.postgresMain.IstanziaORM(clientPostgres).then(() => {
    const path = 'C:/Users/mirko/OneDrive/Documenti/GitHub/test-mp-holistic';
    try {

        main.InizializzaFile(path);//(__dirname);
        //main.expressMain.serverExpressDecorato.use(main.expressMain.httpServer.json());
        main.expressMain.serverExpressDecorato.post('/user', (req: any, res: any) => {
            res.send("OK!!!! mp");
        });
        main.postgresMain.ScriviFile(path);//(__dirname);
        main.expressMain.ScriviFile(path);//(__dirname);

        main.expressMain.StartHttpServer();
        console.log("FINITO BENE");
    } catch (error) {
        console.log(error);
        console.log("FINITO MALE");
    }
});







