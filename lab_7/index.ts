//It's function for find random number
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

// It's function for finad number M
function findM(p: bigint, b: bigint, a: bigint, x: bigint) {
    let mod: bigint = b % p;
    
    let m: bigint = 0n;
    // It's cycle for find number M by the search method
    while ((a ** x * m) % p !== mod) {
        m++;
        let number: bigint = (a ** x * m) % p;
        if (number === mod) {
            return m;
        }
    }
}

// It's function for finad number K
function findK(p: bigint): bigint {
    let k: bigint;

    // It's cycle for find number K when GCP = 1
    do {
        k =  BigInt(Math.floor(Math.random() * 10)) * (p - 1n) + 1n;
    } while (!isTwoPrime(p - 1n, k));

    return k;
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

// It's function for encryption message
function encrypt(text: string, p: bigint, q: bigint, y: bigint): string {
    let text_crypt: string = "";

    for (let i = 0; i < text.length; i++) {
        let m: bigint = BigInt(text.charCodeAt(i));

        // It's random number with GCD(Greatest common divisor) = 1
        let k: bigint = findK(p);

        // It's encrypted message
        let a: bigint = (q ** k) % p;
        let b: bigint = (y ** k * m) % p;

        text_crypt += String.fromCharCode(parseInt(a.toString()));
        text_crypt += String.fromCharCode(parseInt(b.toString()));
    }

    return text_crypt;
}

// It's function for decrypt message
function decrypt(encrypt_text: string, p: bigint, x: bigint): string {
    let text_decrypt: string = "";

    for (let i = 0; i < encrypt_text.length; i+=2) {
        let a: bigint = BigInt(encrypt_text.charCodeAt(i));
        let b: bigint = BigInt(encrypt_text.charCodeAt(i+1));

        let m: bigint | undefined = findM(p, b, a, x);

       if (m) text_decrypt += String.fromCharCode(parseInt(m.toString()));
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
    // It's two prime numbers
    const { p, q } = await getTwoPrimeNumber();

    // It's secret key
    const x: bigint =  BigInt(getRandomIntNumber(parseInt((p-1n).toString()), 2));

    // It's message
    const m: bigint = 4n;

    // It's open key
    const y: bigint = (q ** x) % p;

    // It's message
    const text: string = "Text";

    // It's cyphered message
    const encrypt_text: string = encrypt(text, p, q, y);
    
    // It's decrypted messages
    const decrypt_text: string = decrypt(encrypt_text, p, x);

    // Run by function for analytics
    analitics(text, encrypt_text, decrypt_text);
}

run();