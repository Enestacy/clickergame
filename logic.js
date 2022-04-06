
// объявление глобальных переменных

let counter = 0; // счетчик кликов
const TIMEOUT = 10000; // время игры
const button = document.getElementById('button');
let text = document.querySelector('.textinside');
let time = document.querySelector('.time');
let record = localStorage.hasOwnProperty('record')? +localStorage.getItem('record'): 0; // сохранение рекорда в локальное хранилище 
let record_place = document.getElementById('record_place');
let MyRec = document.createElement('span');
let restart = document.getElementById('restart');

button.onclick = foo1; // привязываем запуск функции счетчика к кнопке

restart.onclick = () => {
  window.location.reload() 
} // привязываем запуск функции перезагрузки страницы к кнопке рестарта

const setRecord = () => {
  MyRec.innerHTML = record;
  record_place.appendChild(MyRec);
}
setRecord() // вывод рекорда в соответствующее поле

//основная функция

function foo1() {
  counter = 1;
  button.onclick = clicks; // переназначаем событие онклик, чтобы избежать перезапуска и мерцания счетчика
  
  const starttime = Date.now();
  time.innerHTML = formatTime(TIMEOUT);
  
  function clicks () {
  let ResScore = document.createElement('p');
  let Score = document.getElementById('counter');
  Score.innerHTML = '';
  counter = ++counter;
  ResScore.innerHTML = ''+ counter;
  Score.appendChild(ResScore);} // функция подсчета кликов

  const interval = setInterval(() => {
    const delta = Date.now() - starttime;
    time.innerHTML = formatTime (TIMEOUT - delta);
  }, 100); // таймер, обратный отсчет

  const timeout = setTimeout(() => {
    button.onclick = null;
    time.style.display='none';
    text.style.display='block'
    text.innerHTML = 'Игра окончена';
    clearInterval(interval);
    clearTimeout(timeout);
  }, TIMEOUT); // события после окончания таймера

  setTimeout (isrecord,TIMEOUT);
};

function formatTime (ms) {
  return Number.parseFloat (ms/1000).toFixed(2);
} // функция форматирования времени

function isrecord () {
  if (counter > record) {
    record=counter;

    MyRec.innerHTML = record;

    localStorage.setItem('record', record)
  };
}; // функция проверки, является ли текущее значение счетчика рекордом


