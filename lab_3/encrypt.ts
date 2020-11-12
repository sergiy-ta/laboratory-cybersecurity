import Crypt from './crypt';

export default class Encrypt extends Crypt {
    public readonly L: number;
    public readonly R: number;

    constructor(L: number, R: number) {
        super(L, R, 9);

        this.L = super.getL();
        this.R = super.getR();
    }
}