import { getRandomInteger,
  generateId,
  generateUrl,
  generateMessage,
  getRandomElement,
} from './util.js';

// Массив описаний фотографий
const DESCRIPTIONS = [
  'Описание фотографии',
  'Описание фотографии для получения уникальности',
  'Третье описание фотографии',
  'Четвертое описание ',
  'А вот и пятое описание'
];

// Массив авторов комментариев
const NAMES = [
  'Alex',
  'Bob',
  'Bill',
  'Sven',
  'Jon',
  'Jim',
  'Andre',
  'Phil'
];

// Массив комментариев от авторов
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

// Создаем комментарий
const createComment = () => ({
  id: getRandomInteger(generateMessage(), 200),
  avatar: `img/avatar-${getRandomInteger(1,6)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES)
});

// Создаем пользователя
const createUsers = () => (
  {
    id: generateId(),
    url: `photos/${generateUrl()}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: Array.from({length: getRandomInteger(0,30)}, createComment)
  }
);

const similarUser = () => Array.from({length: 25}, createUsers);

export {similarUser};
