// It's two mutually prime numbers
const p: number = 23;
const q: number = 17;

// It's secret key
const x: number = Math.floor(Math.random() * (p - 1) + 2);

// It's message
const m: number = 4;

// It's open key
const y: number = (q ** x) % p;

// It's random number with GCD(Greatest common divisor) = 1
const k: number = findK(p);

// It's encrypted message
const a: number = (q ** k) % p;
const b: number = (y ** k * m) % p;

// It's function for finad number M
function findM() {
    let mod: number = b % p;
    
    let m: number = 0;
    // It's cycle for find number M by the search method
    while ((a ** x * m) % p !== mod) {
        m++;
        let number: number = (a ** x * m) % p;
        if (number === mod) {
            return m;
        }
    }
}

// It's function for finad number K
function findK(p: number): number {
    let k: number;

    // It's cycle for find number K when GCP = 1
    do {
        k = Math.floor(Math.random() * (p - 1) + 1);
    } while (!isTwoPrime(p-1, k));

    return k;
}

// It's function for verificate two number in GCD = 1
function isTwoPrime(number1: number, number2: number): boolean | void {
    let number1_list: number[] = [];
    let number2_list: number[] = [];

    for (let i: number = 2; i < number1; i++) {
        if (number1 % i === 0) number1_list.push(i);
    }

    for (let i: number = 2; i <= number2 / 2; i++) {
        if (number2 % i === 0) number2_list.push(i);
    }

    if (number1_list.length === 0 || number2_list.length === 0) return true;
    
    for (let index: number = 0; index < number1_list.length; index++) {
        if (number2_list.includes(number1_list[index])) {
            return false;
        }

        if (index === number1_list.length - 1) return true;
    }
}

// It's function for verification correct work algorithms
function analytics(): void {
    console.log(`Оригінальний текст: ${m}`);
    console.log(`Зашифрований текст: ${a}, ${b}`);
    console.log(`Дешифрований текст: ${findM()}`);
    console.log(`Успішно: ${m === findM()}`);
}

// Run by function for analytics
analytics();