const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_one = document.querySelector('.amount-one');
const amountEl_two = document.querySelector('.amount-two');
const rateEl1 = document.querySelector('.rate-first');
const rateEl2 = document.querySelector('.rate-second');


function spaces(num) {
    num = num.toString()
    num = num.split('.')
    let newNum = ''
    if (num.length>=2) newNum = '.' + num[1]
    num = num[0]
    const s = num.length
    for (let i=s-1; i>=0; i--) {
        let j=i
        for (; i>=j-2 && i>=0; i--) {
            newNum = num[i] + newNum
        }
        i++
        if (i!=0) newNum = ' ' + newNum 
    }
    return newNum
}
function nulls(num) {
    return Number(num);
}

$('input#in1').on('input', function() {
    $(this).val($(this).val().replace(/\,/g, '.'))
    $(this).val($(this).val().replace(/(?=(\d+\.\d{3})).+|(\.(?=\.))|([^\.\d])|(^\D)/gi, '$1'))
    $(this).val($(this).val().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '))
})
$('input#in2').on('input', function() {
    $(this).val($(this).val().replace(/\,/g, '.'))
    $(this).val($(this).val().replace(/(?=(\d+\.\d{3})).+|(\.(?=\.))|([^\.\d])|(^\D)/gi, '$1'))
    $(this).val($(this).val().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 '))
})
function beautify(num) {
    num = nulls(num)
    num = spaces(num)
    return num
}
function antiSpaces(num) {
    let newNum = ''
    for (let i=0; i<num.length; i++) {
        if (num[i] != ' ') newNum = newNum + num[i]
    }
    return newNum
}
function calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two) {
  const currency_one = currencyEl_one.value;
  const currency_two = currencyEl_two.value;

  if (amountEl_one.value == '') return
  amountEl_one.value = antiSpaces(amountEl_one.value)
  fetch(`https://api.exchangerate.host/latest?base=${currency_one}`)
  .then((res) => res.json())
  .then((data) => {
      console.log(data);
      const rate = data.rates[currency_two];
      rateEl1.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;
      rateEl2.innerText = `1 ${currency_two} = ${(1/rate).toFixed(4)} ${currency_one}`;
      amountEl_two.value = beautify((amountEl_one.value * rate).toFixed(4));
    })
    .catch(() => alert('ERROR'))
}

currencyEl_one.addEventListener('change', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
amountEl_one.addEventListener('input', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
currencyEl_two.addEventListener('change', () => {calculate(currencyEl_two, currencyEl_one, amountEl_two, amountEl_one)});
amountEl_two.addEventListener('input', () => {calculate(currencyEl_two, currencyEl_one, amountEl_two, amountEl_one)});
calculate()