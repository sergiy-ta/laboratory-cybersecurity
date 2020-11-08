import { crypt, analytics } from './function';

let text: string = "ЗАХИСТ ІНФОРМАЦІЇ";
let text_encrypt: string = crypt(text);
let text_decipher: string = crypt(text_encrypt);

analytics(text, text_encrypt, text_decipher);