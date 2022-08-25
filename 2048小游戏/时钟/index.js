const numberDivs = document.querySelectorAll('#number div');
const numberSpans = document.querySelectorAll('#number span');
const second = document.querySelector('#second');
const minute = document.querySelector('#minute');
const houre = document.querySelector('#houre');

// 布置钟盘
for (let i = 0; i < numberDivs.length; i++) {
  numberDivs[i].style.transform = `rotate(${i * 30}deg)`;
}
// 纠正文字旋转偏移
for (let j = 0; j < numberSpans.length; j++) {
  numberSpans[j].style.transform = `rotate(${j * -30}deg)`;
}
let i = 1;
print();
let timer = setInterval(print, 1000);

function print() {
  second.style.transform = `rotate(${360/60*i}deg)`;
  minute.style.transform = `rotate(${360/60/60*i}deg)`;
  houre.style.transform = `rotate(${360/12/60/60*i}deg)`;
  i++;
  if (i >60) {
    clearInterval(timer);
  }
}
