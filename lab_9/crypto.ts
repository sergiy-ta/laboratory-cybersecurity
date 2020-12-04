// import class Function
import Function from './function';
// import array alphabet
import { alphabet } from './const';

export default class Crypto {
    public static encrypt(text: string, K1: string, K2: string): string {
        // It's open text T equal size 16 bit
        let T: string = Function.fromStrignToNumber(text);

        // It's text T0 = IP(T)
        let T0: string = Function.getT0(T);

        // It's left and right halves of the T0
        let L0: string = T0.substring(0, alphabet.length / 2);
        let R0: string = T0.substring(alphabet.length / 2, alphabet.length);

        // It's R0 with permutation table E
        let ER0: string = Function.getE(R0);

        // It's result of addition by module 2 for K1 and ER0
        let X: string = Function.XOR(K1,ER0);

        // It's left and right halves of the X
        let B1: string = X.substring(0, X.length / 2);
        let B2: string = X.substring(X.length / 2, X.length);

        // It's sequence Y
        let Y: string = Function.getY(B1,B2);

        // It's L1 and R1
        let L1: string = R0;
        let R1: string = Function.XOR(L0, Function.F(Y));

        // It's R1 with permutation table E
        let ER1: string = Function.getE(R1);

        // It's result of addition by module 2 for K2 and ER1
        X = Function.XOR(ER1, K2);

        // It's left and right halves of the X
        B1 = X.substring(0, X.length / 2);
        B2 = X.substring(X.length / 2, X.length);

        // It's sequence Y
        Y = Function.getY(B1,B2);

        // It's L2 and R2
        let L2: string = R1;
        let R2: string = Function.XOR(L1, Function.F(Y));

        // It's sequence R2L2
        let R2L2: string = R2 + L2;

        return Function.getEncryptText(Function.getIP(R2L2), R2L2);;
    }

    public static decrypt(text: string, K1: string, K2: string): string {
        let decrypt_code: string = Function.fromStrignToNumber(text);
        
        // It's reverse text
        let R2L2: string = Function.inverceUseP(decrypt_code);

        // It's L2 and R2
        let R2: string = R2L2.substring(0, R2L2.length / 2);
        let L2: string = R2L2.substring(R2L2.length / 2, R2L2.length);

        // It's R1
        let R1: string = L2;

        // It's L2 with permutation table E
        let EL2: string = Function.getE(L2);

        // It's result of addition by module 2 for K2 and EL2
        let X: string = Function.XOR(K2,EL2);

        // It's left and right halves of the X
        let B1: string = X.substring(0, X.length / 2);
        let B2: string = X.substring(X.length / 2, X.length);

        // It's sequence Y
        let Y: string = Function.getY(B1,B2);

        // It's new 8 bit sequence
        let FL2K2: string = Function.useP(Y);

        // It's L1
        let L1: string = Function.XOR(R2, FL2K2);

        // It's r0
        let R0: string = L1;

        // It's L1 with permutation table E
        let EL1: string = Function.getE(L1);

        // It's result of addition by module 2 for K1 and EL1
        X = Function.XOR(K1,EL1);

        // It's left and right halves of the X
        B1 = X.substring(0, X.length / 2);
        B2 = X.substring(X.length / 2, X.length);

        // It's sequence Y
        Y = Function.getY(B1,B2);

        // It's new 8 bit sequence
        let FL1K1: string = Function.useP(Y);

        // It's L0
        let L0: string = Function.XOR(R1, FL1K1);

        // It's L0R0
        let L0R0: string = L0 + R0;

        return Function.getEncryptText(Function.getIP(L0R0), L0R0);
    }
}