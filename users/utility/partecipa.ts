import { mpCls, mpPrp } from "mp-holistic";
import { IIt, It } from "../../utility/It";
import { Compagno } from "../compagno";
import { Gruppo } from "../gruppo";


@mpCls({
    itemPostgresClasse: {
        abilitaCreatedAt: true,
        abilitaDeletedAt: true,
        abilitaUpdatedAt: true,
        creaId: true
    }
})
export class Partecipa implements It {
    @mpPrp({
        itemPostgresProprieta: {
            tipo: {
                tipo: 'object',
                colonnaRiferimento: 'serial',
                tabellaRiferimento: 'Gruppo'
            },
            descrizione: '',
            nome: 'gruppo',
            sommario: '',
        }
    }) gruppo: Gruppo;
    @mpPrp({
        itemPostgresProprieta: {
            tipo: {
                tipo: 'object',
                colonnaRiferimento: 'serial',
                tabellaRiferimento: 'Compagno'
            },
            descrizione: '',
            nome: 'compagno',
            sommario: '',
        }
    }) compagno: Compagno;
    constructor() {
        this.compagno = new Compagno();
        this.gruppo = new Gruppo();
    }
    isEqual(item: Partecipa): boolean {
        return true;
    }
    Compare(item: Partecipa): number {
        return 0;
    }
    UnionResult(): Partecipa {
        return this;
    }
}