// Создаем генератор случайных целых чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElements = (elements, count) =>{
  if(count < 1){
    return elements[getRandomInteger(0, elements.length - 1)];
  } else if(count >= elements.length){
    return elements;
  }
  const result = [];
  for(let i = 0; i < count; i++){
    let currentValue = elements[getRandomInteger(0, elements.length - 1)];
    while(result.includes(currentValue)){
      currentValue = elements[getRandomInteger(0, elements.length - 1)];
    }
    result.push(currentValue);
  }
  return result;
};

// Создает id
const createId = (id) => function () {
  return ++id;
};

// Генерируем id для переменных
const generateId = createId (0);
const generateUrl = createId(0);
const generateMessage = createId(0);

//  Создаем генератор случайных элементов
const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

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

export { getRandomInteger,
  getRandomArrayElements,
  generateId,
  generateUrl,
  generateMessage,
  getRandomElement,
  isEscapeKey,
  showAlert,
  debounce,
};
