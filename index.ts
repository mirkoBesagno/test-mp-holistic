



/* import { Admin } from "./users/admin"; */

import "reflect-metadata";
import { Main } from "mp-holistic";

import { Admin } from "./users/admin";
import { Client } from "pg";


/* const admin: Admin = new Admin(); */
const admin: Admin = new Admin();

const main = new Main('api', undefined, false);
/* main.postgresMain.listaRuoli.push({
    connectionLimit: 0,
    inRole: ['ruolouno'],
    nome: 'ruolouno',
    option: {
        creaDB: false,
        creaTabelle: false,
        creaUser: true,
        isSuperUser: false,
        login: true,
    },
    password: '123'
}); */
/* main.postgresMain.listaUser.push({
    connectionLimit: 1,
    inRole: ['ruolouno'],
    nome: 'useruno',
    option: {
        creaDB: true,
        creaTabelle: true,
        creaUser: true,
        isSuperUser: false,
        login: true,
    },
    password: 'ciao'
}); */
main.expressMain.Inizializza('localhost', 8080, undefined, false);

main.postgresMain.InizializzaORM([{
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
}], [{
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
}]);
/* main.postgresMain.listaRuoli.push({

}); */

/* super user */
export const clientPostgres = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'postgres',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
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
/* try {
    clientPostgres.connect();
} catch (error) {
    console.log(error);
}
try {
    clientPostgres_ruolouno.connect();
} catch (error) {
    console.log(error);
} */
//export const istancePg_ruolouno = clientPostgres_ruolouno.connect();

console.log(admin);

main.postgresMain.IstanziaORM(clientPostgres);
main.expressMain.ScriviFile(__dirname);

main.expressMain.StartHttpServer();






