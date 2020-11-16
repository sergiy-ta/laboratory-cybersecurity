const p: number = 3;
const q: number = 11;

const M: number[] = [3, 1, 2];
const H: number[] = [6];

function findM1andM2(p: number, q: number, M: number[], H: number[]): { m1: number, m2: number } {
    const n: number = p * q;
    const w = (): number => (p - 1) * (q - 1);
    const e = (): number => Math.floor(Math.random() * (w() - 1) + 1);
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

    for (let i: number = 0; i < M.length; i++) {
        H[i + 1] = (M[i] + H[i]) ** 2 % 33;
    }

    const m1: number = H[H.length - 1];

    const S: number = m1 ** d() % n;
    const m2: number = S ** e_number % n;

    return { m1, m2 };
}

function analytics(m1, m2): void {
    console.log(`Цифровий підпис: ${m1}`);
    console.log(`Хеш значення: ${m2}`);
    console.log(`Успішно: ${m1 === m2}`);
}

let { m1, m2 } = findM1andM2(p, q, M, H);
analytics(m1, m2);