import { mpCls, mpMtd, mpPrm, mpPrp } from "mp-holistic";
import { pool } from "..";
import { IIt } from "../utility/It";


@mpCls({
    itemPostgresClasse: {
        abilitaCreatedAt: true,
        abilitaDeletedAt: true,
        abilitaUpdatedAt: true,
        creaId: true,
    }
})
export class Gruppo implements IIt {


    /* @mpPrp({
        itemPostgresProprieta: {
            tipo: 'serial',
            nome: 'id', descrizione: '', sommario: ''
        }
    }) */
    id: number;
    @mpPrp({
        itemPostgresProprieta: {
            nome: 'dataCreazione',
            nomeVariante: 'dataCreazione',
            descrizione: '',
            sommario: '',
            tipo: 'date'
        }
    }) dataCreazione: Date;

    public async GetListaCompagni() {
        const tmp = await pool.query(`select * from public."Partecipa" p 
        where p.gruppo = '${this.id}'`);
        return tmp;
    }
    public async GetListaIncontri() {
        const tmp = await pool.query(`select * from public."Incontro" i 
        where i.gruppo = '${this.id}'`);
        return tmp;
    }
    invalidUnion?: boolean | undefined;
    constructor() {
        this.id = 0;
        this.dataCreazione = new Date();
    }

    Compare(item: IIt): number {
        return 0;
    }
    isEqual(item: IIt): boolean {
        return true;
    }
    UnionResult(): Gruppo {
        return this;
    }

    @mpMtd()
    async AggiungiIncontro(@mpPrm({
        itemExpressParametro: {
            tipo: 'numeric', indexParameter: 0, nomeVariante: 'partecipante'
        }
    }) partecipante: number) {
        const tmp = await pool.query(`INSERT INTO public."Incontro"
        (gruppo,compagnoPartecipante)
        VALUES(${this.id},${partecipante});`);
        return tmp;
    }
}