import { IIt, It, IUnionable } from "./It";
import { Lista } from "./lista";

class Name extends It {
    constructor() {
        super();
    }
    Compare(item: IIt): number {
        return 0;
    }
    isEqual(item: IIt): boolean {
        return true;
    }
}


export class name implements IIt {
    constructor() {

    }
    Compare(item: IIt): number {
        return 0;
    }
    isEqual(item: IIt): boolean {
        return true;
    }
    invalidUnion?: boolean | undefined;
    UnionResult(): IUnionable {
        return this;
    }
}

const gg = new Lista<name>();

//gg.Aggiungi(new name());

gg.Aggiungi(new Name());