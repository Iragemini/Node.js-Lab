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
  console.log(data);
  console.log('result', data.Cur_OfficialRate);
  BYN.value = data.Cur_OfficialRate;
  result.value = data.Cur_Scale;
  result.placeholder = data.Cur_Abbreviation;
  resultLabel.textContent = data.Cur_Abbreviation;
}

currencyList.onchange = function (e) {
  console.log('e', e.target.value);
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

function init() {
  getCurrencyList();
  getDate();
}

document.addEventListener('DOMContentLoaded', init);
