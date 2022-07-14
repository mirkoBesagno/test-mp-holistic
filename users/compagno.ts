import { mpCls, mpPrp } from "mp-holistic";
import { IIt } from "../utility/It";
import { Lista } from "../utility/lista";
import { Partecipa } from "./utility/partecipa";




@mpCls({
    itemPostgresClasse: {
        abilitaCreatedAt: true,
        abilitaDeletedAt: true,
        abilitaUpdatedAt: true,
        creaId: true
    }
})
export class Compagno implements IIt {
    @mpPrp({
        itemPostgresProprieta: {
            nome: 'nome',
            nomeVariante: 'nome',
            descrizione: '',
            sommario: '',
            tipo: 'varchar(n)'
        }
    }) nome: string;
    @mpPrp({
        itemPostgresProprieta: {
            nome: 'cognome',
            nomeVariante: 'cognome',
            descrizione: '',
            sommario: '',
            tipo: 'varchar(n)'
        }
    }) cognome: string;
    invalidUnion?: boolean | undefined;
    /*  */
    @mpPrp({
        /* itemPostgresProprieta: {
            tipo: {
                tipo: 'object',
                colonnaRiferimento: 'serial',
                tabellaRiferimento: 'Partecipa'
            },
            descrizione: '',
            nome: 'listaGruppi',
            sommario: '',
        } */
    }) listaGruppi: Lista<Partecipa>;
    constructor() {
        this.cognome = '';
        this.nome = '';
        this.listaGruppi = new Lista<Partecipa>();
    }
    Compare(item: Compagno): number {
        if (this.nome == item.nome) {
            if (this.cognome == item.cognome) return 0;
            if (this.cognome > item.cognome) return 1;
            if (this.cognome < item.cognome) return -1;
        }
        if (this.nome < item.nome) return -1;
        if (this.nome > item.nome) return -1;

        return 0;
    }
    isEqual(item: Compagno): boolean {
        if (this.Compare(item) == 0) return true;
        else return false;
    }
    UnionResult(): Compagno {
        return this;
    }

}


