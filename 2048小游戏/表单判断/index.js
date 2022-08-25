const mobileDom = document.querySelector('.mobile-input');
const error = document.querySelector('p.error');
mobileDom.addEventListener('input', function() {
  if (mobileDom.value !== '' && mobileDom.value.length !== 11) {
    error.innerHTML = '手机号码格式不正确';
  } else {
    error.innerHTML = '';
  }
});
