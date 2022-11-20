const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.querySelector('.amount-one');
const amountEl_two = document.querySelector('.amount-two');
const rateEl1 = document.querySelector('.rate-first');
const rateEl2 = document.querySelector('.rate-second');

// function validate(inp) {
//     inp.value = inp.value.replace(/[^\d,.]*/g, '')
//     .replace(/([,.])[,.]+/g, '$1')
//     .replace(/^[^\d]*(\d+([.,]\d{0,5})?).*$/g, '$1');
// }

// validate(amountEl_two)

function spaces(num) {
    num = num.split('.')
    let newNum = '.' + num[1]
    num = num[0]
    const s = num.length
    for (let i=s; i>=0; i--) {
        for (;i<=3)
    }
}

function nulls(num) {
    return Number(num);
}
function beautify(num) {
    num = nulls(num)
    // num = spaces(num)
    return num
}
function calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two) {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  fetch(`https://api.exchangerate.host/latest?base=${currency_one}`)
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      const rate = data.rates[currency_two];
      rateEl1.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;
      rateEl2.innerText = `1 ${currency_two} = ${(1/rate).toFixed(4)} ${currency_one}`;
      amountEl_two.value = beautify((amountEl_one.value * rate).toFixed(4));
    })
}



currencyEl_one.addEventListener('change', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
amountEl_one.addEventListener('input', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
currencyEl_two.addEventListener('change', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
amountEl_two.addEventListener('input', () => {calculate(currencyEl_two, currencyEl_one, amountEl_two, amountEl_one)});
calculate()