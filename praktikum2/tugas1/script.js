let currentInput = '';
let operator = '';
let previousInput = '';

function inputNumber(num) {
    // Mencegah penambahan angka 0 di depan
    if (currentInput === '0' && num === 0) return;
    currentInput += num;
    updateDisplay(currentInput);
}

function operate(op) {
    if (op === '=') {
        calculate();
    } else {
        // Menyimpan operator dan input sebelumnya
        operator = op;
        previousInput = currentInput;
        currentInput = '';
    }
}

function calculate() {
    if (previousInput && currentInput && operator) {
        let result;
        const prev = parseFloat(previousInput);
        const curr = parseFloat(currentInput);

        switch (operator) {
            case '+':
                result = prev + curr;
                break;
            case '-':
                result = prev - curr;
                break;
            case '*':
                result = prev * curr;
                break;
            case '/':
                result = prev / curr;
                break;
            case '**':
                result = Math.pow(prev, curr);
                break;
            case '%':
                result = prev % curr; // Menghitung modulus
                break;
            default:
                return; // Jika operator tidak dikenali, keluar dari fungsi
        }
        currentInput = result.toString(); // Mengubah hasil menjadi string
        previousInput = '';
        operator = '';
        updateDisplay(currentInput);
    }
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    updateDisplay(0);
}

function updateDisplay(value) {
    const display = document.getElementById('display');
    display.innerText = value;
}
