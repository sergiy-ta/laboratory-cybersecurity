import { H, alphabet, permution_table, E, S, P, IP } from './const';

export default class Function {
    // It's function get random number
    public static getRandomIntNumber(max: number = 128, min: number = 1): number {
        return Math.floor(Math.random() * (max - min) + min);
    }

    // It's function for get K
    public static getK(CD: string): string {
        let T0: string[] = [];
        for (let i: number = 0; i < H.length; i++) {
            T0.push(CD[H[i]]);
        }
        return T0.join('');
    }

    // It's function for permutiona of bits left
    public static permutationOfBitsLeft(value: string, number: number): string {
        let new_value: string[] = [];
        for(let i: number = 0; i < value.length; i++) {
            if (i + number < value.length) new_value[i] = value[i + number];
            else new_value[i] = value[i + number - value.length];
        }
        return new_value.join('');
    }

    // It's function for convert from number to bit
    public static fromNumberToBit(text: string, size: number = 8): string {
        let zero: string = "";
        for (let i = 0; i < size - text.length; i++) zero += "0";

        return zero + text;
    }

    // It's function for find C0
    public static findC0(K: string, G: number[][]): string {
        let C0: string[] = [];
        for (let i: number = 0; i < K.length; i++) {
            C0.push(K[G[0][i]]);
        }
        return C0.join('');
    }

    // It's function for find D0
    public static findD0(K: string, G: number[][]): string {
        let D0: string[] = [];
        for (let i: number = 0; i < K.length; i++) {
            D0.push(K[G[1][i]]);
        }
        return D0.join('');
    }

    // It's function for convert from string to number
    public static fromStrignToNumber(text: string): string {
        let new_string: string[] = [];
        for(let i: number = 0; i < text.length; i++) {
            let index:number = alphabet.indexOf(text[i]);
    
            let zero: string = "";
            for (let i = 0; i < 4 - index.toString(2).length; i++) zero += "0";
    
            new_string.push(zero + index.toString(2));
        }
        return new_string.join('');
    }

    // It's function for get T0
    public static getT0(T:string):string {
        let T0: string[] = [];
        for (let i: number = 0; i < T.length; i++) {
            T0[i] = T[permution_table[i]];
        }
        return T0.join('');
    }

    // It's function for find E
    public static getE(R: string): string {
        let ER: string[] = [];
        for (let i: number = 0; i < E.length; i++) {
            ER.push(R[E[i]]);
        }
        return ER.join('');
    }

    // It's function of addition by module 2 for two number
    public static XOR(number1: string, number2: string): string {
        let text: string = "";
        let size: number = 0;
    
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
    
        return text;
    }

    // It's function for get B from table S
    public static getSB(number: string, index: number = 0): string {
        let first: number = parseInt(parseInt(number[0] + number[5], 2).toString());
        let second: number = parseInt(parseInt(number[1] + number[2] + number[3] + number[4], 2).toString());
    
        return S[index][first][second].toString(2);
    }

    // It's function for get S1B1, S2B2
    public static get2SB(B1: string, B2: string): { S1B1: string, S2B2: string } {
        let size: number = 0;
        
        let S1B1: string = Function.getSB(B1);
        let S2B2: string = Function.getSB(B2,1);
    
        if (S1B1.length >= S2B2.length) size = S1B1.length;
        else size = S2B2.length;
    
        let zero1: string = "";
        for (let i = 0; i < size - S1B1.length; i++) zero1 += "0";
    
        let zero2: string = "";
        for (let i = 0; i < size - S2B2.length; i++) zero2 += "0";
    
        S1B1 = zero1 + S1B1;
        S2B2 = zero2 + S2B2;
    
        return { S1B1, S2B2 };
    }

    // It's function for get new 8 bit sequence
    public static F(Y: string): string {
        return Function.useP(Y);
    }

    // It's function for get Y
    public static getY(B1: string, B2: string): string {
        let { S1B1, S2B2 } = Function.get2SB(B1,B2);
        return S1B1 + S2B2;
    }

    // It's function for get new 8 bit sequence from table P
    public static useP(Y: string): string {
        let number: string[] = [];
        for (let i: number = 0; i < Y.length; i++) {
            number.push(Y[P[i]]);
        }
        return number.join('');
    }

    // It's reverse function from useP
    public static inverceUseP(decrypt_code: string): string {
        let number: string[] = [];
        for (let i: number = 0; i < decrypt_code.length; i++) {
            number[IP[i]] = decrypt_code[i];
        }
        return number.join('');
    }

    // It's function for get new string from table IP
    public static getIP(RL: string): string {
        let text: string[] = [];
        for (let i: number = 0; i < IP.length; i++) {
            text.push(RL[IP[i]]);
        }
        return text.join('');
    }

    // It's function for get encrypt text
    public static getEncryptText(text_ip: string, R2L2: string): string {
        let encrypt_text: string[] = [];
        for (let i: number = 0; i < R2L2.length; i+=4) {
            encrypt_text.push(alphabet[parseInt(parseInt(text_ip[i] + text_ip[i+1] + text_ip[i+2] + text_ip[i+3],2).toString(10))]);
        }
        return encrypt_text.join('');
    }
}