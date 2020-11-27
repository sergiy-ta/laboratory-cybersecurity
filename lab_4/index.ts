// It's message
const M: bigint[] = [3n,1n,2n];

// It's encrypt message
const C: bigint[] = [];

// It's decrypt message
const new_M: bigint[] = [];

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

// It's function for find number D
function findD(): bigint {
    let number: bigint = 0n;
    let mod: bigint = 1n % w;
    while ((e * number) % w !== mod && number < n) {
        number++;
    }
    return number;
}

// It's function for find number C
function findC(M: bigint): bigint {
    return (M ** e) % n;
}

// It's function for find number decrypted M
function findM(C: bigint): bigint {
    return (C ** d) % n;
}

// It's function for encrypt message
function encrypted() {
    M.forEach(M => {
        C.push(findC(M));
    });
}

// It's function for decrypt message
function decrypted() {
    C.forEach(C => {
        new_M.push(findM(C));
    });
}

// It's function for algorithm analysis
function analytics(): void {
    console.log(`Оригінальний масив: ${M}`);
    console.log(`Зашифрований масив: ${C}`);
    console.log(`Дешифрований масив: ${new_M}`);
    console.log(`Успішно: ${M.join() === new_M.join()}`);
}


// Run the functions
encrypted();
decrypted();
analytics();