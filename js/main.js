const DESCRIPTIONS = [
  'Описание фотографии',
  'Описание фотографии для получения уникальности',
  'Третье описание фотографии',
  'Четвертое описание ',
  'А вот и пятое описание'
];

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

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];


const createId = (id) => function () {
  return ++id
};

const generateId = createId (0);
const generateUrl = createId(0);
const generateMessage = createId(0);

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomMessage = () => (Math.round(Math.random()) === 0 ? MESSAGES[Math.round(Math.abs(Math.random() * MESSAGES.length - 1))] : `${MESSAGES[Math.round(Math.abs(Math.random() * MESSAGES.length - 1))]} ${MESSAGES[Math.round(Math.abs(Math.random() * MESSAGES.length - 1))]}`);

const getRandomElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createUsers = () => (
  {
    id: generateId(),
    url: `photos/${generateUrl()}.jpg`,
    description: getRandomElement(DESCRIPTIONS),
    likes: getRandomInteger(15,200),
    comments: [{
      id: getRandomInteger(generateMessage(), 200),
      avatar: `'img/avatar-${getRandomElement(1,6)}.svg'`,
      message: getRandomMessage(),
      name: getRandomElement(NAMES)
    }]
  }
);

// createUsers();

const similarUser = Array.from({length: 25}, createUsers);
console.log(similarUser);
