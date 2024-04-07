// Проверка нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

const errorTemplate = document.querySelector('#data-error').content.querySelector('section');
function showAlert(message) {
  const errorElement = errorTemplate.cloneNode(true);
  const errorTitle = errorElement.querySelector('h2');
  errorTitle.textContent = message;
  document.body.insertAdjacentElement('beforeend',errorElement);
  setTimeout(() => {
    errorElement.remove();
  }, 5000);
}

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  isEscapeKey,
  showAlert,
  debounce,
};
