const M: bigint[] = [3n,1n,2n];
const C: bigint[] = [];
const new_M: bigint[] = [];

const p: bigint = 2999n;
const q: bigint = 4999n;
const n: bigint = p * q;
const w: bigint = (p - 1n) * (q - 1n);
const e: bigint = 4561n;
const d: bigint = findD();

function findD(): bigint {
    let number: bigint = 0n;
    let mod: bigint = 1n % w;
    while ((e * number) % w !== mod && number < n) {
        number++;
    }
    return number;
}

function findC(M: bigint): bigint {
    return (M ** e) % n;
}

function findM(C: bigint): bigint {
    return (C ** d) % n;
}

function encrypted() {
    M.forEach(M => {
        C.push(findC(M));
    });
}

function decrypted() {
    C.forEach(C => {
        new_M.push(findM(C));
    });
}

function analytics(): void {
    console.log(`Оригінальний масив: ${M}`);
    console.log(`Зашифрований масив: ${C}`);
    console.log(`Дешифрований масив: ${new_M}`);
    console.log(`Успішно: ${M.join() === new_M.join()}`);
}


encrypted();
decrypted();
analytics();