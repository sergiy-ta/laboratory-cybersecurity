// import class Function
import Function from './function';
export default class Key {
    private K1: string;
    private K2: string;

    // It's table G
    private G: number[][] = [];

    constructor() {
        let G1: number[] = Function.rundomNumberList(15, 7, [8]);
        let G2: number[] = Function.rundomNumberList(15, 7, [8, ...G1]);

        this.G = [G1, G2];

        let k: [string, string] = [String.fromCharCode(Function.getRandomIntNumber()), String.fromCharCode(Function.getRandomIntNumber())];
        let ANCII: [string, string] = this.findASCII(k);
        
        let K1K2 = this.findK1K2(ANCII);

        this.K1 = K1K2.K1;
        this.K2 = K1K2.K2;
    }

    private findASCII(k: [string, string]): [string, string] {
        return [k.toString().charCodeAt(0).toString(2), k.toString().charCodeAt(1).toString(2)]
    }

    // It's function for find K1 and K2
    private findK1K2(ANCII: string[]): { K1: string, K2: string } {
        // It's ANCII
        let ANCII1 = Function.fromNumberToBit(ANCII[0],8);
        let ANCII2 = Function.fromNumberToBit(ANCII[1],8);

        // It's K
        let K: string = ANCII1 + ANCII2;

        // It's C0 and D0
        let C0: string = Function.findC0(K, this.G);
        let D0: string = Function.findD0(K, this.G);

        // It's C1 and D1
        let C1: string = Function.permutationOfBitsLeft(C0,1);
        let D1: string = Function.permutationOfBitsLeft(D0,1);

        // It's C2 and D2
        let C2: string = Function.permutationOfBitsLeft(C1,2);
        let D2: string = Function.permutationOfBitsLeft(D1,2);

        // It's K1 and K2
        let K1: string = Function.getK(C1+D1);
        let K2: string = Function.getK(C2+D2);

        return { K1, K2 };
    }

    // It's method for get K1
    public getK1(): string {
        return this.K1;
    }

    // It's method for get K2
    public getK2(): string {
        return this.K2;
    }
}