let text: string = "ЗАХИСТ ІНФОРМАЦІЇ";
let text_encrypt: string = encrypt(text);

function encrypt(text: string): string {
    let text_array: string[] = text.split("");
    let new_text_array: string[] = [];
    for (let i = 0; i < text_array.length; i += 6) {
        new_text_array[i + 2] = text_array[i + 0];
        new_text_array[i + 4] = text_array[i + 1];
        new_text_array[i + 1] = text_array[i + 2];
        new_text_array[i + 5] = text_array[i + 3];
        new_text_array[i + 0] = text_array[i + 4];
        new_text_array[i + 3] = text_array[i + 5];
    }
    return new_text_array.join("");
}

function decipher(text: string): string {
    let text_array: string[] = text.split("");
    let new_text_array: string[] = [];
    for (let i = 0; i < text_array.length; i += 6) {
        new_text_array[i + 0] = text_array[i + 2];
        new_text_array[i + 1] = text_array[i + 4];
        new_text_array[i + 2] = text_array[i + 1];
        new_text_array[i + 3] = text_array[i + 5];
        new_text_array[i + 4] = text_array[i + 0];
        new_text_array[i + 5] = text_array[i + 3];
    }
    return new_text_array.join("");
}

function analytics(): void {
    console.log(`Оригінальний текст: ${text}`);
    console.log(`Зашифрований текст: ${text_encrypt}`);
    console.log(`Дешифрований текст: ${decipher(text_encrypt)}`);
    console.log(`Успішно: ${text === decipher(text_encrypt) ? true : false}`);
}

analytics();