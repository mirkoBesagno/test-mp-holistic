

import { mpCls, mpMtd, mpPrm, mpPrp, ErroreMio } from "mp-holistic";
import { ExpressParametro, ListaExpressParametro } from "mp-holistic/bin/express/parametro.express";
import { IParametriEstratti, IReturn } from "mp-holistic/bin/express/utility/utility";
import { ListaMetadataParametro } from "mp-holistic/bin/metadata/parametro.metadata";
import { TypeDecoratoreParametro } from "mp-holistic/dist/bin/decoratori/parametro.decoratore";
import { clientPostgres, pool } from "..";

let scambiovariabile = 0;

const autorizazione: TypeDecoratoreParametro = {
    itemExpressParametro: {
        autenticatore: true, tipo: 'varchar(n)', nomeVariante: 'authorization', posizione: 'header'
    }
};

const middlewareTest = (req: any, res: any, next: any) => {
    console.log("Middleware test!!");
    next();
};
@mpCls({
    itemPostgresClasse: {
        abilitaCreatedAt: true,
        abilitaDeletedAt: true,
        abilitaUpdatedAt: true,
        creaId: true,
        grants: [
            /* {
                events: [
                    'SELECT'
                ],
                ruoli: [
                    'ruolodue'
                ]
            }, */
            {
                events: [
                    'SELECT'
                ],
                ruoli: [
                    'ruolodue'
                ],
                colonneRiferimento: ['id'],

            }
        ]
    }
})
export class Admin {

    static async IstanziatoreGenerico(parametri: IParametriEstratti, listaParametri: ListaMetadataParametro) {
        const aout = <ExpressParametro>(<ListaExpressParametro>listaParametri).GetAutenticatore();
        try {
            const rito = await clientPostgres.query('SELECT * FROM "Admin" where id = $1', [aout.valore]);
            const tt = <Admin>rito.rows[0];
            const gg = new Admin();
            gg.nome = tt.nome;
            gg.cognome = tt.cognome;
            return gg;
        } catch (error) {
            console.log(error);
            throw new ErroreMio({ codiceErrore: 500, messaggio: 'Hei non hai le credenziali.' });
        }
    }
    @mpPrp({
        itemPostgresProprieta: {
            nome: 'nome',
            nomeVariante: 'nome',
            descrizione: '',
            sommario: '',
            tipo: 'varchar(n)',
            grants: [{
                events: [
                    'INSERT', 'UPDATE'
                ],
                ruoli: [
                    'ruolodue'
                ]
            }]
        }
    }) nome: string;
    @mpPrp({
        itemPostgresProprieta: {
            nome: 'cognome',
            nomeVariante: 'cognome',
            descrizione: '',
            sommario: '',
            tipo: 'varchar(n)',
            grants: [{
                events: [
                    'INSERT'
                ],
                ruoli: [
                    'ruolodue'
                ]
            }],
            Constraints: { notNull: false, unique: { nome: 'cognome', unique: true } }
        }
    }) cognome: string;
    constructor() {
        this.nome = '';
        this.cognome = '';
    }

    @mpMtd({
        itemExpressMetodo: { metodoLimitazioni: { middleware: [middlewareTest] } }
    }) Ciao() {
        return "ciao";
    }
    @mpMtd({
        itemExpressMetodo: {
            metodoLimitazioni: {},
            metodoEventi: {
                Istanziatore: async (parametri: IParametriEstratti, listaParametri: ListaMetadataParametro) => {
                    const aout = <ExpressParametro>(<ListaExpressParametro>listaParametri).GetAutenticatore();
                    let adminTmp: Admin | undefined = undefined;
                    try {
                        const rito = await clientPostgres.query('SELECT * FROM "Admin" where id = $1', [aout.valore]);
                        const tt = <Admin>rito.rows[0];
                        const gg = new Admin();
                        gg.nome = tt.nome;
                        return gg;
                    } catch (error) {
                        console.log(error);
                        throw new ErroreMio({ codiceErrore: 500, messaggio: 'Hei non hai le credenziali.' });
                    }
                    return adminTmp ?? undefined;
                }
            }
        }
    }) Presentati(@mpPrm(autorizazione) authorization: string) {

        if (authorization == '5') {
            scambiovariabile = Math.random();
        }

        return <IReturn>{
            stato: 200,
            body: {
                scambiovariabile: scambiovariabile
            }
        };
    }
    @mpMtd({
        itemExpressMetodo: {
            metodoEventi: {
                Istanziatore: Admin.IstanziatoreGenerico
            }
        }
    }) async CambiaNome(@mpPrm(autorizazione) authorization: string,
        @mpPrm({ itemExpressParametro: { nomeVariante: 'nome', posizione: 'query', tipo: 'varchar(n)' } }) nome: string,
        @mpPrm({ itemExpressParametro: { nomeVariante: 'id', posizione: 'query', tipo: 'varchar(n)' } }) id: string) {
        try {
            await pool.query(
                `UPDATE public."Admin"
                SET nome='${nome}'
                WHERE id=${id};
                `);
            /* await pool.query(
                `UPDATE public."Admin"
                SET nome='${nome}';
                `); */
        } catch (error: any) {
            console.log(error);
            if ('code' in error && error.code == '23505') {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore di duplicazione"
                    }
                };
            }
            else if ('code' in error && error.code == '42501') {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore di permesso"
                    }
                };
            }
            else {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore generico"
                    }
                };
            }
        }
        return <IReturn>{
            stato: 200,
            body: {
                messaggio: "ciao"
            }
        };
        //return "ciao";
    }
    @mpMtd({
        itemExpressMetodo: {
            metodoEventi: {
                Istanziatore: Admin.IstanziatoreGenerico
            }
        }
    }) async CambiaCognome(@mpPrm(autorizazione) authorization: string,
        @mpPrm({ itemExpressParametro: { nomeVariante: 'cognome', posizione: 'query', tipo: 'varchar(n)' } }) cognome: string,
        @mpPrm({ itemExpressParametro: { nomeVariante: 'id', posizione: 'query', tipo: 'varchar(n)' } }) id: string) {
        try {
            await pool.query(
                `UPDATE public."Admin"
                SET cognome='${cognome}'
                WHERE id=${id};
                `);
            /* await pool.query(
                `UPDATE public."Admin"
                SET nome='${nome}';
                `); */
        } catch (error: any) {
            console.log(error);
            if ('code' in error && error.code == '23505') {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore di duplicazione"
                    }
                };
            }
            else if ('code' in error && error.code == '42501') {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore di permesso"
                    }
                };
            }
            else {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore generico"
                    }
                };
            }
        }
        return <IReturn>{
            stato: 200,
            body: {
                messaggio: "ciao"
            }
        };
        //return "ciao";
    }
    @mpMtd({
        itemExpressMetodo: {
            metodoSpawProcess: {
                isSpawTrigger: 'authorization',
                checkSpawTrigger: [
                    {
                        nome: 'authorization',
                        posizione: 'header'
                    }
                ],pathAccept:['/api/admin/Presentati']
            },
            metodoEventi: {
                Istanziatore: async (parametri: IParametriEstratti, listaParametri: ListaMetadataParametro) => {
                    try {
                        const gg = new Admin();
                        return gg;
                    } catch (error) {
                        console.log(error);
                        throw new ErroreMio({ codiceErrore: 500, messaggio: 'Non so il motivo' });
                    }
                }/* ,
                onDopoAverTerminatoLaFunzione: (item) => {
                    return <IReturn>{
                        body: { messaggio: item },
                        stato: 200
                    };
                } */
            }
        }
    }) CreaNuovoProcesso(@mpPrm({ itemExpressParametro: { tipo: 'varchar(n)' } }) id: string) {
        //return "ciao :" + this.nome;

        if (id == '5') {
            scambiovariabile = Math.random();
        }

        return <IReturn>{
            stato: 200,
            body: {
                authorization: '' + id,
                scambiovariabile: scambiovariabile
            }
        };
    }
    @mpMtd() async AggiungiAdmin(@mpPrm({ itemExpressParametro: { nomeVariante: 'nome', posizione: 'query', tipo: 'varchar(n)' } }) nome: string,
        @mpPrm({ itemExpressParametro: { nomeVariante: 'cognome', posizione: 'query', tipo: 'varchar(n)' } }) cognome: string) {
        try {
            await pool.query(
                'INSERT INTO public."Admin"' + " (nome,cognome) VALUES('" +
                nome + "','" + cognome + "');");
        } catch (error: any) {
            console.log(error);
            if ('code' in error && error.code == '23505') {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore di duplicazione"
                    }
                };
            }
            else {
                return <IReturn>{
                    stato: 200,
                    body: {
                        messaggio: "errore generico"
                    }
                };
            }
        }
        return <IReturn>{
            stato: 200,
            body: {
                messaggio: "ciao"
            }
        };
        //return "ciao";
    }
}