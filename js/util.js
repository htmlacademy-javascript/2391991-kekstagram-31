// Создаем генератор случайных целых чисел
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
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

// // Проверка нажатия клавиши Enter
// const isEnterKey = (evt) => evt.key === 'Enter';

export { getRandomInteger,
  generateId,
  generateUrl,
  generateMessage,
  getRandomElement,
  isEscapeKey,
  // isEnterKey
};
