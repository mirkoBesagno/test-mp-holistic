


export interface IComparabile {
    Compare(item: IIt): number | 1 | 0 | -1;
    isEqual(item: IIt): boolean;
}
export interface IUnionable {
    UnionResult(): IUnionable;
    invalidUnion?: boolean;
}

export interface IIt extends IComparabile, IUnionable {
    // Compare(item: IIt): number | 1 | 0 | -1;
    // isEqual(item: IIt): boolean;
}



export class It implements IIt {
    constructor() {

    }
    Compare(item: IIt): number {
        return 0;
    }
    isEqual(item: IIt): boolean {
        return true;
    }
    UnionResult(): IIt {
        return this;
    }
}