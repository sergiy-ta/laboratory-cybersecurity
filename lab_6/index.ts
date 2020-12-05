//It's function for find random number
function getRandomIntNumber(max: number = 10000, min: number = 100000): number {
    return Math.floor(Math.random() * (max - min) + min);
}

// It's function of verification if number is prime
function isPrime(number: number): boolean {
    if (number % 2 === 0 || number % 3 === 0 || number % 5 === 0 || number % 7 === 0 || number % 11 === 0) return false;

    for (let i: number = 13; i <= number / 2 + 1; i += 2) {
        if (number % i === 0) return false;
    }

    return true;
}

// It's function for get prime number
function getPrimeNumber(): Promise<bigint> {
    return new Promise<bigint>(resolve => {
        let number: number;

        do {
            number = getRandomIntNumber();
            if (number % 4 === 3 && isPrime(number)) resolve(BigInt(number));
        } while (number % 4 !== 3 || !isPrime(number));
    });
}

// It's function for encryption message
function encrypt(text: string, n: bigint): string {
    let text_crypt: string = "";

    for (let i = 0; i < text.length; i++) {
        let m: bigint = BigInt(text.charCodeAt(i));

        const C: bigint = (m ** 2n) % n;

        text_crypt += String.fromCharCode(parseInt(C.toString()));
    }

    return text_crypt;
}

// It's function for find yp and yq
function findYpYq(p: bigint, q: bigint): { yp: bigint, yq: bigint } {
    let yp: bigint[] = [1n, 0n];
    let yq: bigint[] = [0n, 1n];
    let r: bigint[] = [p, q];
    let t: bigint[] = [];

    while (r[r.length - 1] !== 1n) {
        t.push(r[r.length - 2] / r[r.length - 1]);
        r.push(r[r.length - 2] % r[r.length - 1]);
        yp.push(yp[yp.length - 2] - t[t.length - 1] * yp[yp.length - 1]);
        yq.push(yq[yq.length - 2] - t[t.length - 1] * yq[yq.length - 1]);
    }

    return {
        yp: yp[yp.length - 1],
        yq: yq[yq.length - 1]
    };
}

// It's function for decrypt message
function decrypt(encrypt_text: string, p: bigint, q: bigint, n: bigint, yp: bigint, yq: bigint): string {
    let text_decrypt: string = "";

    for (let i = 0; i < encrypt_text.length; i++) {
        let C: bigint = BigInt(encrypt_text.charCodeAt(i));

        // It's number mp and mq
        let mp: bigint = (C ** ((p + 1n) / 4n)) % p;
        let mq: bigint = (C ** ((q + 1n) / 4n)) % q;

        // It's number r1, r2, r3, r4
        let r1: bigint = ((yp * p * mq) + (yq * q * mp)) % n;
        let r2: bigint = n - r1;
        let r3: bigint = ((yp * p * mq) - (yq * q * mp)) % n;
        let r4: bigint = n - r3;

        r1 = r1 < 0 ? r1 * -1n : r1;
        r2 = r2 < 0 ? r2 * -1n : r2;
        r3 = r3 < 0 ? r3 * -1n : r3;
        r4 = r4 < 0 ? r4 * -1n : r4;

        let r: number = Math.min(parseInt(r1.toString()), parseInt(r2.toString()), parseInt(r3.toString()), parseInt(r4.toString()));

        text_decrypt += String.fromCharCode(parseInt(r.toString()));
    }

    return text_decrypt;
}

// It's function for algorithm analysis
function analitics(text: string, encrypt_text: string, decrypt_text: string): void {
    console.log(`Оригінальний текст: ${text}`);
    console.log(`Зашифрований текст: ${encrypt_text}`);
    console.log(`Дешифрований текст: ${decrypt_text}`);
    console.log(`Тексти співпадають ${text === decrypt_text}`);
}

// It's main function
async function main() {
    // It's two prime numbers
    const p: bigint = await getPrimeNumber();
    const q: bigint = await getPrimeNumber();

    // It's open key
    const n: bigint = p * q;

    // It's number yp and yq
    const { yp, yq } = findYpYq(p, q);

    // It's message
    const text: string = "Text";

    // It's cyphered message
    const encrypt_text: string = encrypt(text, n);
    
    // It's decrypted messages
    const decrypt_text: string = decrypt(encrypt_text, p, q, n, yp, yq);

    analitics(text, encrypt_text, decrypt_text);
}

main();