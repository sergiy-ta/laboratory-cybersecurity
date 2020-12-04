// import class Crypto
import Crypto from './crypto';

// import class Key
import Key from './key';

// It's original text
let text: string = "KOFE";

// It's encrypt and decrypt text
const key: Key = new Key();
let encrypt = Crypto.encrypt(text, key.getK1(), key.getK2());
let decrypt = Crypto.decrypt(encrypt, key.getK1(), key.getK2());

// It's function for verification correct work algorithms
function analytics(): void {
    console.log(`Оригінальний текст: ${text}`);
    console.log(`Зашифрований текст: ${encrypt}`);
    console.log(`Дешифрований текст: ${decrypt}`);
    console.log(`Успішно: ${text === decrypt}`);
}

// Run by function for analytics
analytics();