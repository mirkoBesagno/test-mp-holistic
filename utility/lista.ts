import { IComparabile, It } from "./It";




export interface ILista<T> {
    Aggiungi(item: IComparabile): void;
    items: Array<T>
}



export class Lista<IIt> implements ILista<It> {
    items: It[];

    constructor() {
        this.items = [];
    }

    Aggiungi(item: It): void {
        let trovato = false;
        for (let index = 0; index < this.items.length && trovato == false; index++) {
            const element = this.items[index];
            if (element.Compare(item) == 0) {
                trovato = true;
            }
        }
        if (trovato == false)
            this.items.push(item);
    }

}

