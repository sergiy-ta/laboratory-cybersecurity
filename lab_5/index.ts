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

// It's function for find secret key
function findD(w: bigint, e: bigint, n: bigint): bigint {
    let number: bigint = 0n;
    let mod: bigint = 1n % w;
    while ((e * number) % w !== mod && number < n) {
        number++;
    }
    return number;
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

// It's function for algorithm analysis
function analytics(text: string, m1: bigint, S: bigint, m2: bigint): void {
    console.log(`Відкратий текст ${text}`);
    console.log(`Хеш значення 1: ${m1}`);
    console.log(`Цифровий підпис: ${S}`);
    console.log(`Хеш значення 2: ${m2}`);
    console.log(`Успішно: ${m1 === m2}`);
}

async function run() {
    // It's two mutually prime numbers
    const { p, q } = await getTwoPrimeNumber();

    // It's product two mutually prime numbers
    const n: bigint = p * q;

    // It's functional Euler
    const w: bigint = (p - 1n) * (q - 1n);

    // It's open key
    const e: bigint = 4561n;

    // It's secret key
    const d: bigint = findD(w, e, n);

    // It's message
    const text: string = "Text";

    // It's encrypt message
    const H: bigint[] = [6n];

    // It's hash value
    const m1: bigint = findM1(text, H, n);

    // It's digital signature
    const S: bigint = m1 ** d % n;

    // It's hash value
    const m2: bigint = S ** e % n;


    // Run the function
    analytics(text, m1, S, m2);
}

run();