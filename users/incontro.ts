import { mpCls, mpPrp } from "mp-holistic";
import { IIt, IUnionable } from "../utility/It";
import { Compagno } from "./compagno";
import { Gruppo } from "./gruppo";



@mpCls({
    itemPostgresClasse: {
        abilitaCreatedAt: true,
        abilitaDeletedAt: true,
        abilitaUpdatedAt: true,
        creaId: true,
    }
})
export class Incontro implements IIt {

    @mpPrp({
        itemPostgresProprieta: {
            nome: 'compagnoPartecipante',
            nomeVariante: 'compagnoPartecipante',
            descrizione: '',
            sommario: '',
            tipo: {
                colonnaRiferimento: 'serial',
                tabellaRiferimento: 'Compagno',
                tipo: 'object'
            }
        }
    }) compagnoPartecipante: Compagno;
    @mpPrp({
        itemPostgresProprieta: {
            nome: 'gruppo',
            nomeVariante: 'gruppo',
            descrizione: '',
            sommario: '',
            tipo: {
                colonnaRiferimento: 'serial',
                tabellaRiferimento: 'Gruppo',
                tipo: 'object'
            }
        }
    }) gruppo: Gruppo;

    @mpPrp({
        itemPostgresProprieta: {
            nome: 'giorno',
            nomeVariante: 'giorno',
            descrizione: '',
            sommario: '',
            tipo: 'date'
        }
    }) giorno: Date;

    constructor() {
        //this.listaCompagniPartecipanti = new Lista<Compagno>();
        this.compagnoPartecipante = new Compagno();
        this.gruppo = new Gruppo();
        this.giorno = new Date();
    }


    Compare(item: Incontro): number {
        return 0;
    }
    isEqual(item: Incontro): boolean {
        return true;
    }
    invalidUnion?: boolean | undefined;
    UnionResult(): Incontro {
        return this;
    }
}