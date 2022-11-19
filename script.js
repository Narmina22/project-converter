const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.querySelector('.amount-one');
const amountEl_two = document.querySelector('.amount-two');

const rateEl1 = document.querySelector('.rate-first');
const rateEl2 = document.querySelector('.rate-second');

function calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two) {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  console.log(currency_one, currency_two)
  fetch(`https://api.exchangerate.host/latest?base=${currency_one}`)
    .then((res) => res.json())
    .then((data) => {
        console.log(data);
        const rate = data.rates[currency_two];
        rateEl1.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;
        rateEl2.innerText = `1 ${currency_two} = ${(1/rate).toFixed(4)} ${currency_one}`;
        amountEl_two.value = (amountEl_one.value * rate).toFixed(4);
    })
}

function nulls(num) {
    if(num.split('.')[1] == '0000') num = num.split[0];
    return num;
}

function spaces(num) {
    const s = num.length;
    const chars = num.split('');
    const strWithSpaces = chars.reduceRight((acc, char, i) => {
        const spaceOrNothing = ((((s - i) % 3) === 0) ? ' ' : '');
        return (spaceOrNothing + char + acc);
    }, '');
    return ((strWithSpaces[0] === ' ') ? strWithSpaces.slice(1) : strWithSpaces);
}

currencyEl_one.addEventListener('change', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
amountEl_one.addEventListener('input', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
currencyEl_two.addEventListener('change', () => {calculate(currencyEl_two, currencyEl_one, amountEl_two, amountEl_one)});
amountEl_two.addEventListener('input', () => {calculate(currencyEl_two, currencyEl_one, amountEl_two, amountEl_one)});
calculate()