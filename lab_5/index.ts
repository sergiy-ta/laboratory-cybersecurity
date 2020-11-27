// It's message
const M: bigint[] = [3n,1n,2n];

// It's encrypt message
const H: bigint[] = [6n];

// It's two mutually prime numbers
const p: bigint = 2999n;
const q: bigint = 4999n;

// It's product two mutually prime numbers
const n: bigint = p * q;

// It's functional Euler
const w: bigint = (p - 1n) * (q - 1n);

// It's open key
const e: bigint = 4561n;

// It's secret key
const d: bigint = findD();

// It's hash value
const m1: bigint = findM1();

// It's digital signature
const S: bigint = m1 ** d % n;

// It's hash value
const m2: bigint = S ** e % n;

// It's function for find secret key
function findD(): bigint {
    let number: bigint = 0n;
    let mod: bigint = 1n % w;
    while ((e * number) % w !== mod && number < n) {
        number++;
    }
    return number;
}

// It's function for find hash value
function findM1(): bigint {
    for (let i: number = 0; i < M.length; i++) {
        H[i + 1] = findH(M[i], H[i]);
    }

    return H[H.length - 1];
}

// It's function for find number H
function findH(M: bigint, H: bigint): bigint {
    return ((M + H) ** 2n) % n;
}

// It's function for algorithm analysis
function analytics(): void {
    console.log(`Хеш значення 1: ${m1}`);
    console.log(`Цифровий підпис: ${S}`);
    console.log(`Хеш значення 2: ${m2}`);
    console.log(`Успішно: ${m1 === m2}`);
}

// Run the function
analytics();