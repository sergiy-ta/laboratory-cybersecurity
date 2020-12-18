// //It's function for find random number
function getRandomIntNumber(max: number = 100000, min: number = 10000): number {
    return Math.floor(Math.random() * (max - min) + min);
}

// It's function for get prime number
function getTwoPrimeNumber(): Promise<{p: bigint, q: bigint}> {
    return new Promise<{p: bigint, q: bigint}>(resolve => {
        let p: bigint;
        let q: bigint;

        do {
            p = BigInt(getRandomIntNumber());
            q = BigInt(getRandomIntNumber());
            if (isTwoPrime(p, q)) resolve({p, q});
        } while (!isTwoPrime(p, q));
    });
}

// It's function for verificate two number in GCD = 1
function isTwoPrime(number1: bigint, number2: bigint): boolean | void {
    let number1_list: bigint[] = [];
    let number2_list: bigint[] = [];

    for (let i: number = 2; i <= number1 / 2n; i++) {
        if (number1 % BigInt(i) === 0n) number1_list.push(BigInt(i));
    }

    for (let i: number = 2; i <= number2 / 2n; i++) {
        if (number2 % BigInt(i) === 0n) number2_list.push(BigInt(i));
    }

    if (number1_list.length === 0 || number2_list.length === 0) return true;
    
    for (let index: number = 0; index < number1_list.length; index++) {
        if (number2_list.includes(number1_list[index])) {
            return false;
        }

        if (index === number1_list.length - 1) return true;
    }
}

function findE(w: bigint): Promise<bigint> {
    return new Promise<bigint>(resolve => {
        let e: bigint;

        do {
            e = BigInt(getRandomIntNumber(parseInt((w - 1n).toString()), 2));
            if (isTwoPrime(e, w)) resolve(e);
        } while (!isTwoPrime(e, w));
    });
}

// It's function for find number D
function findD(w: bigint, n: bigint, e: bigint): bigint {
    let number: bigint = 0n;
    let mod: bigint = 1n % w;
    while ((e * number) % w !== mod && number < n) {
        number++;
    }
    return number;
}

// It's function for find number C
function findC(M: bigint, e: bigint, n: bigint): bigint {
    return (M ** e) % n;
}

// It's function for find number decrypted M
function findM(C: bigint, d: bigint, n: bigint): bigint {
    return (C ** d) % n;
}

// It's function for encryption message
function encrypt(text: string, e: bigint, n: bigint): string {
    let text_crypt: string = "";

    for (let i = 0; i < text.length; i++) {
        let m: bigint = BigInt(text.charCodeAt(i));

        let C: bigint = findC(m, e, n);

        text_crypt += String.fromCharCode(parseInt(C.toString()));
    }

    return text_crypt;
}

// It's function for decrypt message
function decrypt(encrypt_text: string, d: bigint, n: bigint): string {
    let text_decrypt: string = "";

    for (let i = 0; i < encrypt_text.length; i++) {
        let C: bigint = BigInt(encrypt_text.charCodeAt(i));

        let M: bigint = findM(C, d, n);

        text_decrypt += String.fromCharCode(parseInt(M.toString()));
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


async function run() {
    // It's two mutually prime numbers
    const { p, q } = await getTwoPrimeNumber();

    // It's product two mutually prime numbers
    const n: bigint = p * q;

    // It's functional Euler
    const w: bigint = (p - 1n) * (q - 1n);

    // It's open key
    const e: bigint = await findE(w);

    // It's secret key
    const d: bigint = findD(w, n, e);
    
    // It's message
    const text: string = "Text";

    // It's cyphered message
    const encrypt_text: string = encrypt(text, e, n);
    
    // It's decrypted messages
    const decrypt_text: string = decrypt(encrypt_text, d, n);

    // Run by function for analytics
    analitics(text, encrypt_text, decrypt_text);
}

run();