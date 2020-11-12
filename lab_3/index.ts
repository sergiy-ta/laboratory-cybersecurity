import Encrypt from './encrypt';
import Decrypt from './decrypt';

let text: string = "HelloWorld";

let encrypt_text: string = "";
let decrypt_text: string = "";

function encrypt(): string {
    let number_array: number[] = [];
    let string_array: string[] = [];

    if (text.length % 2 !== 0) {
        text += " ";
    }

    for (let i = 0; i < text.length; i += 2) {
        let encrypt: Encrypt = new Encrypt(text.charCodeAt(i), text.charCodeAt(i+1));
        number_array.push(encrypt.L);
        number_array.push(encrypt.R);
    }

    number_array.forEach((element, index) => {
        string_array[index] = String.fromCharCode(element);
    });

    return string_array.join("");
}

function decrypt(): string {
    let number_array_2: number[] = [];
    let string_array_2: string[] = [];

    for (let i = 0; i < encrypt_text.length; i += 2) {
        let encrypt: Decrypt = new Decrypt(encrypt_text.charCodeAt(i), encrypt_text.charCodeAt(i + 1));
        number_array_2.push(encrypt.L);
        number_array_2.push(encrypt.R);
    }

    number_array_2.forEach((element, index) => {
        string_array_2[index] = String.fromCharCode(element);
    });

    return string_array_2.join("");
}

function analitics(): void {
    console.log(`Оригінальний текст: ${text}`);
    console.log(`Зашифрований текст: ${encrypt_text}`);
    console.log(`Дешифрований текст: ${decrypt_text}`);
    console.log(`Тексти співпадають ${text === decrypt_text}`);
}

encrypt_text = encrypt();
decrypt_text = decrypt();

analitics();