// It's message
const M: bigint[] = [3n,1n,2n];

// It's encrypt message
const H: bigint[] = [6n];

// It's two mutually prime numbers
const p: bigint = 1036n;
const q: bigint = 1005n;

// It's secret key
const x: bigint = 8n;

// It's open key
const y: bigint = (q ** x) % p;

// It's product two mutually prime numbers
const n: bigint = p * q;

// It's hash value
const m1: bigint = findM1();

// It's function for find hash value
function findM1() {
    for (let i: number = 0; i < M.length; i++) {
        H[i + 1] = ((M[i] + H[i]) ** 2n) % n;
    }

    return H[H.length - 1];
}

// It's random number with GCD(Greatest common divisor) = 1
const k: bigint = findK(p);

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

// It's signature element a
const a: bigint = (q ** k) % p;

// It's signature element b
const b: bigint = findB();

// It's function for find signature element b
function findB(): bigint {
    let b: bigint = 1n;

    while(((x * a) + (k * b)) % (p - 1n) !== m1 % (p - 1n)) {
        b++;
    }

    return b;
}

// It's functional Euler
const w: bigint = (p - 1n) * (q - 1n);

// It's digital signature
const S: bigint = (m1 ** x) % n;

// It's hash value
const m2: bigint = (S ** y) % n;

// It's function for algorithm verificate
function verificate() {
    console.log(`Успішно: ${((y ** a) * (a ** b)) % p === (q ** m2) % p}`);
}

// Run the function
verificate();