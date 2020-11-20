// It's number p and q
const p: number = 7;
const q: number = 11;

// It's number n
const n: number = p * q;

// It's number yp and yq
const yp: number = -3;
const yq: number = 2;

// It's message
const m: number = 24;
const wm: number = 17;

// It's cyphered message
const C: number = encrypt(m);

// It's decrypted messages
const { r1, r2, r3, r4 } = decrypt(C);

// It's correct message
const correctR: number = findCorrectR(r1, r2, r3, r4);

// It's function for encryption message
function encrypt(m :number): number {
    return m ** 2 % n;
}

// It's function for decrypt message
function decrypt(C: number): { r1: number, r2: number, r3: number, r4: number } {
    // It's number mp and mq
    let mp: number = C ** (0.25 * (p + 1)) % p;
    let mq: number = C ** (0.25 * (q + 1)) % q;
    
    // It's number r1, r2, r3, r4
    let r1: number = ((yp * p * mq + yq * q * mp) % n) + n;
    let r2: number = n - r1;
    let r3: number = ((yp * p * mq - yq * q * mp) % n) + n;
    let r4: number = n - r3;

    return { r1, r2, r3, r4 };
}

function findCorrectR(r1: number, r2: number, r3: number, r4: number): number {
    const number: number = 7;
    if (r1 % wm === number) return r1;
    else if (r2 % wm === number) return r2;
    else if (r3 % wm === number) return r3;
    else if (r4 % wm === number) return r4;
    return NaN;
}

function analytics(): void {
    console.log(`Оригінальний текст: ${m}`);
    console.log(`Зашифрований текст: ${C}`);
    console.log(`Дешифровані тексти: ${r1}, ${r2}, ${r3}, ${r4}`);
    console.log(`Успішно: ${r1 === m || r2 === m || r3 === m || r4 === m}`);
    console.log(`Дешифрований текст: ${correctR}`);
    console.log(`Успішно: ${m === correctR}`);
}

analytics();