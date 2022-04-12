



/* import { Admin } from "./users/admin"; */

import "reflect-metadata";
import { Main } from "mp-holistic";

import { Admin } from "./users/admin";
import { Client } from "pg";


/* const admin: Admin = new Admin(); */
const admin: Admin = new Admin();

const main = new Main('api', undefined, false);
main.postgresMain.listaRuoli.push({
    connectionLimit: 0,
    inRole: ['ruolouno'],
    nome: 'ruolouno',
    option: {
        creaDB: true,
        creaTabelle: true,
        creaUser: true,
        isSuperUser: true,
        login: true,
    },
    password: ''
});
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
        creaDB: true,
        creaTabelle: true,
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
        creaDB: true,
        creaTabelle: true,
        creaUser: true,
        isSuperUser: true,
        login: true
    },
    password: 'user'
}]);
/* main.postgresMain.listaRuoli.push({

}); */


export const clientPostgres = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'test-mp-holistic',
    password: 'DGRmjYyNw38iH5mwsr4qXvZZfgNljw',//'postgres', //DGRmjYyNw38iH5mwsr4qXvZZfgNljw
    port: 5432,
});

console.log(admin);

main.postgresMain.IstanziaORM(clientPostgres);
main.expressMain.ScriviFile(__dirname);

main.expressMain.StartHttpServer();






