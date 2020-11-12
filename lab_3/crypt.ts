export default class Crypt {
    protected new_R: number = 0;
    protected new_L: number = 0;

    constructor(L: number, R: number, number: number) {
        this.new_L = L;
        this.new_R = R;

        for (let i = 0; i < number; i++) {
            this.getNew(this.new_R, this.new_L);
        }
    }

    protected getR(): number {
        return this.new_R;
    }

    protected getL(): number {
        return this.new_L;
    }

    protected XOR(number1: string, number2: string): string {
        let text: string = "";
        let size: number = 0;
        number1 = parseInt(number1).toString(2);
        number2 = parseInt(number2).toString(2);

        if (number1.length >= number2.length) size = number1.length;
        else size = number2.length;

        let zero1: string = "";
        for (let i = 0; i < size - number1.length; i++) zero1 += "0";

        let zero2: string = "";
        for (let i = 0; i < size - number2.length; i++) zero2 += "0";

        number1 = zero1 + number1;
        number2 = zero2 + number2;

        for (let i = 0; i < number1.length; i++) {
            if (number1[i] === "1" && number2[i] === "1") text += "0";
            else if (number1[i] === "1" || number2[i] === "1") text += "1";
            else text += "0";
        }

        return parseInt(text, 2).toString(10);
    }

    protected F(L: number, n: number): number {
        return (L + n) % 256;
    }

    protected getData(R: number, L: number): string {
        return this.XOR(R.toString(), this.F(+L, 1).toString());
    }

    protected getNewR(R: number, L: number): number {
        return L;
    }

    protected getNewL(R: number, L: number): number {
        return +this.getData(R, L);
    }

    protected getNew(R: number, L: number): void {
        this.new_R = this.getNewR(R, L);
        this.new_L = this.getNewL(R, L);
    }
}