const keys: { n: number, e: number, d: number } = findEandD();
const M_array: number[] = [3, 1, 2];
const C_array: number[] = encrypt(M_array, keys);
const M_array_decrypt: number[] = decrypt(C_array, keys);

function isPrime(number: number): boolean {
    if (number === 2 || number === 3 || number === 5) {
        return true;
    }

    if (number === 1 || number % 2 === 0 || number % 3 === 0 || number % 5 === 0) {
        return false;
    }

    for (let i: number = 7; i <= number / 2; i+=2) {
        if (number % i === 0) {
            return false;
        }
    }

    return true;
}

function findEandD(): { n :number, e: number, d: number } {
    const p: number = 23;
    const q: number = 31;
    if (isPrime(p) && isPrime(q)) {
        const n: number = p * q;
        const w = () => (p - 1) * (q - 1);
        const e = () => Math.floor(Math.random() * (w() - 1) + 1);
        const e_number: number = e();
        const d = () => {
            function d1(): number {
                let mod: number = 1 % w();
                let d: number = 0;
                while ((e_number * d) % w() !== mod) d++;
                return d;
            }

            return d1() < n ? d1() : undefined;
        }
        return {
            n: n,
            e: e_number,
            d: d()
        };
    } else {
        console.log("Числа p і q повинні бути простими");
    }
}

function encrypt(M_array: number[], keys: { n: number, e: number, d: number }): number[] {
    let C_array: number[] = [];
    for (let i = 0; i < M_array.length; i++) {
        C_array.push(M_array[i] ** keys.e % keys.n);
    }
    return C_array;
}

function decrypt(C_array: number[], keys: { n: number, e: number, d: number }): number[] {
    let M_array: number[] = [];
    for (let i = 0; i < C_array.length; i++) {
        M_array.push(C_array[i] ** keys.d % keys.n);
    }
    return M_array;
}

function analytics(): void {
    console.log(`Оригінальний масив: ${M_array}`);
    console.log(`Зашифрований масив: ${C_array}`);
    console.log(`Дешифрований масив: ${M_array_decrypt}`);
    console.log(`Успішно: ${M_array.join() === M_array_decrypt.join() ? true : false}`);
}

analytics();