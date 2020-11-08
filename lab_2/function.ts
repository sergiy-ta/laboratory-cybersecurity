import { A, C, M, array_T } from './const';

const T = (i: number) => i > 0 ? (A * array_T[i - 1] + C) % M : array_T[0];

function XOR(number1: string, number2: string): string {
    let text: string = "";
    let size: number = 0;

    if (number1.length >= number2.length) size = number1.length;
    else size = number2.length;

    let zero1: string = "";
    for (let i = 0; i < size - number1.length; i++) zero1 += 0;

    let zero2: string = "";
    for (let i = 0; i < size - number2.length; i++) zero2 += 0;

    number1 = zero1 + number1;
    number2 = zero2 + number2;

    for (let i = 0; i < size; i++) {
        if (number1[i] === "1" && number2[i] === "1") text += "0";
        else if (number1[i] === "1" || number2[i] === "1") text += "1";
        else text += "0";
    }

    return parseInt(text, 2).toString(10);
}

export function crypt(text: string): string {
    let text_crypt: string = "";

    let array_text: string[] = [];
    let array_crypt: string[] = [];

    for (let i = 0; i < text.length; i++) {
        array_text.push(text.charCodeAt(i).toString(2));
        array_T.push(T(i));
        array_crypt.push(XOR(array_text[i], array_T[i+1].toString(2)));
        text_crypt += String.fromCharCode(parseInt(array_crypt[i]));
    }

    return text_crypt;
}

export function analytics(text: string, text_encrypt: string, text_decipher: string): void {
    console.log(`Оригінальний текст: ${text}`);
    console.log(`Зашифрований текст: ${text_encrypt}`);
    console.log(`Дешифрований текст: ${text_decipher}`);
    console.log(`Успішно: ${text === text_decipher ? true : false}`);
}