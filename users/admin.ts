

import { mpCls, mpMtd, mpPrm, mpPrp, ErroreMio } from "mp-holistic";
import { ExpressParametro, ListaExpressParametro } from "mp-holistic/bin/express/parametro.express";
import { IParametriEstratti, IReturn } from "mp-holistic/bin/express/utility/utility";
import { ListaMetadataParametro } from "mp-holistic/bin/metadata/parametro.metadata";
import { clientPostgres } from "..";

let scambiovariabile = 0;


@mpCls({
    itemPostgresClasse: {
        abilitaCreatedAt: true,
        abilitaDeletedAt: true,
        abilitaUpdatedAt: true,
        creaId: true,
    }
})
export class Admin {

    @mpPrp({
        itemPostgresProprieta: {
            nome: 'nome',
            descrizione: '',
            sommario: '',
            tipo: 'varchar(n)',
            /* grants: [{
                events: [
                    'INSERT'
                ],
                ruoli: [
                    'nomeruolouno'
                ] 
            }]*/
        }
    })
    nome: string;
    constructor() {
        this.nome = '';
    }

    @mpMtd({

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
    }) Presentati(@mpPrm({ itemExpressParametro: { autenticatore: true, tipo: 'varchar(n)', nomeVariante: 'authorization', posizione: 'header' } }) authorization: string) {

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
                Istanziatore: async (parametri: IParametriEstratti, listaParametri: ListaMetadataParametro) => {
                    (<ListaExpressParametro>listaParametri).GetAutenticatore();
                    let adminTmp: Admin = new Admin();/* await knexInstance<Admin>()
                        .select('username')
                        .from(Admin)
                        .where({ id: listaParametri[0] }).first(); */
                    return adminTmp;
                }
            }
        }
    }) CambiaNome(nome: string) {

        return "ciao";
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
                ]
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
                }
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
}