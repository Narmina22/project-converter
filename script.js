const currencyEl_one = document.getElementById('currency-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.querySelector('.amount-one');
const amountEl_one = document.querySelector('.amount-two');
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
function onlyYou(num) {
    num = num.toString()
    let newNum = '';
    let f = 0;
    l = num.length;
    if(l > 0 && (num[0] < '0' || num[0] > '9')) return ''
    for(let i = 0; i < l; i++){
        if(num[i] >='0' && num[i] <= '9')newNum += num[i];
        else if(f == 0 && num[i] == '.'){f = 1; newNum += num[i];}
        else if(f == 0 && num[i] == ','){f = 1; newNum += '.';}
    }
    return newNum;
}
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
function antiNulls(num){
    num = num.toString();
    let l = num.length;
    let i = 0;
    while(num[i] == '0')i++;
    if(i > 0 && (num[i] == '.' || l - i == 0))i--;
    num = num.substr(i, l - i)
    return num
}
function calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two) {
  const currency_one = currencyEl_one.value
  const currency_two = currencyEl_two.value
  let f = 1;
  if (amountEl_one.value == '') f = 0
  amountEl_one.value = onlyYou(amountEl_one.value)
  amountEl_one.value = antiSpaces(amountEl_one.value)
  amountEl_one.value = antiNulls(amountEl_one.value)
  fetch(`https://api.exchangerate.host/latest?base=${currency_one}`)
  .then((res) => res.json())
  .then((data) => {
      const rate = data.rates[currency_two];
      console.log(data);
      rateEl1.innerText = `1 ${currency_one} = ${rate.toFixed(4)} ${currency_two}`;
      rateEl2.innerText = `1 ${currency_two} = ${(1/rate).toFixed(4)} ${currency_one}`;
      if (f==1) {
        amountEl_two.value = beautify((amountEl_one.value / rate).toFixed(4));
        amountEl_one.value = spaces(amountEl_one.value)
    }
      if (f==0) amountEl_two.value = ''
    })
    .catch(() => alert('ERROR'))
}

currencyEl_one.addEventListener('change', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
amountEl_one.addEventListener('input', () => {calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)});
currencyEl_two.addEventListener('change', () => {calculate(currencyEl_two, currencyEl_one, amountEl_two, amountEl_one)});
amountEl_two.addEventListener('input', () => {calculate(currencyEl_two, currencyEl_one, amountEl_two, amountEl_one)});
calculate(currencyEl_one, currencyEl_two, amountEl_one, amountEl_two)
