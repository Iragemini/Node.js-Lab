const API = 'https://www.nbrb.by/api/exrates';
const currencyList = document.querySelector('#currencyList');
const result = document.querySelector('#result');
const resultLabel = document.querySelector('#resultLabel');
const BYN = document.querySelector('#BYN');
const date = document.querySelector('#date');

async function getCurrencyList() {
  const response = await fetch(`${API}/rates?periodicity=0`);
  if (!response.ok) {
    console.log('Failed to load');
    return;
  }
  const data = await response.json();
  for (let i = 0; i < data.length; i++) {
    let option = data[i].Cur_Name;
    let optionValue = data[i].Cur_ID;
    let element = document.createElement('option');
    element.textContent = option;
    element.value = optionValue;
    currencyList.appendChild(element);
  }
}

async function getSelectedCurrency(id) {
  if (!id) {
    result.value = '';
    return;
  }
  const response = await fetch(`${API}/rates/${id}`);
  const data = await response.json();
  BYN.value = data.Cur_OfficialRate;
  result.value = data.Cur_Scale;
  result.placeholder = data.Cur_Abbreviation;
  resultLabel.textContent = data.Cur_Abbreviation;
  localStorage.setItem('result', data.Cur_Scale);
  localStorage.setItem('BYN', data.Cur_OfficialRate);
}

currencyList.onchange = function (e) {
  getSelectedCurrency(e.target.value);
};

function getDate() {
  let today = new Date();
  let options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  let todayDMY = today.toLocaleDateString('ru-RU', options);
  date.innerHTML = todayDMY;
}

function calculate() {
  let value = result.value;
  if (!value) value = 0;
  let savedValue = localStorage.getItem('result') || 0;
  let savedValueBYN = localStorage.getItem('BYN') || 0;
  let valuePerOne = +savedValueBYN / +savedValue;
  return (valuePerOne * +value).toFixed(4);
}

function init() {
  getCurrencyList();
  getDate();
  localStorage.removeItem('result');
  localStorage.removeItem('BYN');
}

result.onchange = function () {
  let resultValue = calculate();
  BYN.value = resultValue;
};
result.onkeypress = function (evt) {
  let charCode = parseCharCode(evt);
  let eventType = evt.type;
  if (charCode == 13) return false;
  if (evt.altKey || evt.ctrlKey) {
    return true;
  }
  if (evt.shiftKey && (evt.altKey || evt.ctrlKey)) {
    return true;
  }
  if (eventType == 'keypress') {
    let checkCode = evt.charCode;
    if (typeof checkCode != 'undefined') {
      charCode = checkCode;
      return (charCode > 47 && charCode < 58) || charCode == 0;
    }
    checkCode = evt.which;
    if (typeof checkCode != 'undefined') {
      charCode = checkCode;
      return (charCode > 47 && charCode < 58) || charCode == 0 || charCode == 8;
    }
    return charCode > 47 && charCode < 58;
  }
  if (eventType == 'keydown') {
    return (
      (charCode > 95 && charCode < 106) ||
      (charCode > 47 && charCode < 58) ||
      (charCode > 32 && charCode < 41) ||
      charCode == 8 ||
      charCode == 46
    );
  }
  return false;
};
function parseCharCode(evt) {
  let c = evt.keyCode ? evt.keyCode : evt.which ? evt.which : 0;
  if (evt.type != 'keydown') return evt.charCode ? evt.charCode : c;
  else return c;
}

document.addEventListener('DOMContentLoaded', init);
