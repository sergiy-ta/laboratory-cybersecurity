//It's function for find random number
function getRandomIntNumber(max: number = 1000000, min: number = 10000): number {
    return Math.floor(Math.random() * (max - min) + min);
}

// It's function for get prime number
function getTwoPrimeNumber(): Promise<{p: bigint, q: bigint}> {
    return new Promise<{p: bigint, q: bigint}>(resolve => {
        let p: bigint;
        let q: bigint;

        do {
            p = BigInt(getRandomIntNumber());
            q = BigInt(getRandomIntNumber(parseInt((p - 1n).toString())));
            if (isTwoPrime(p, q)) resolve({p, q});
        } while (!isTwoPrime(p, q));
    });
}

// It's function for find hash value
function findM1(text: string, H: bigint[], n: bigint): bigint {
    for (let i = 0; i < text.length; i++) {
        let m: bigint = BigInt(text.charCodeAt(i));

        H[i + 1] = findH(m, H[i], n);
    }

    return H[H.length - 1];
}

// It's function for find number H
function findH(M: bigint, H: bigint, n: bigint): bigint {
    return ((M + H) ** 2n) % n;
}

// It's function for finad number K
function findK(p: bigint): bigint {
    let k: bigint;

    // It's cycle for find number K when GCP = 1
    do {
        k = BigInt(Math.floor(Math.random() * 10)) * (p - 1n) + 1n;
    } while (!isTwoPrime(p-1n, k));

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

// It's function for find signature element b
function findB(x: bigint, a: bigint, k: bigint, p: bigint, m1: bigint): bigint {
    let b: bigint = 1n;

    while(((x * a) + (k * b)) % (p - 1n) !== m1 % (p - 1n)) {
        b++;
    }

    return b;
}

// It's function for algorithm verificate
function verificate(y: bigint, a: bigint, b: bigint, p: bigint, q: bigint, m2: bigint) {
    console.log(`Успішно: ${((y ** a) * (a ** b)) % p === (q ** m2) % p}`);
}


async function run() {
    // It's message
    const text: string = "Text";

    // It's encrypt message
    const H: bigint[] = [6n];

    // It's two mutually prime numbers
    const { p, q } = await getTwoPrimeNumber();

    // It's secret key
    const x: bigint = BigInt(getRandomIntNumber(parseInt((p-1n).toString()), 2));

    // It's open key
    const y: bigint = (q ** x) % p;

    // It's product two mutually prime numbers
    const n: bigint = p * q;

    // It's hash value
    const m1: bigint = findM1(text, H, n);

    // It's random number with GCD(Greatest common divisor) = 1
    const k: bigint = findK(p);

    // It's signature element a
    const a: bigint = (q ** k) % p;

    // It's signature element b
    const b: bigint = findB(x, a, k, p, m1);

    // It's functional Euler
    const w: bigint = (p - 1n) * (q - 1n);

    // It's digital signature
    const S: bigint = (m1 ** x) % n;

    // It's hash value
    const m2: bigint = (S ** y) % n;

    // Run the function
    verificate(y, a, b, p, q, m2);
}

run();