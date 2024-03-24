import {isEscapeKey} from './util.js';

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imageInput = form.querySelector('.img-upload__input');
const imageOverlay = form.querySelector('.img-upload__overlay');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const uploadCloseButton = imageOverlay.querySelector('.img-upload__cancel');

const MAX_SYMBOLS = 20;

const onDocumentKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt) && document.activeElement !== imageDescription && document.activeElement !== imageHashtags) {
    keydownEvt.preventDefault();
    closeUploadImgModal();
  }
};

imageInput.addEventListener('change', () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');


  document.addEventListener('keydown', onDocumentKeydown);

  pristine.validate();
});


function closeUploadImgModal () {
  document.removeEventListener('keydown', onDocumentKeydown);


  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
}

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
}, false);

function validateDescription (value) {
  return value.length <= 140;
}

pristine.addValidator(imageDescription, validateDescription, 'Длина комментария не может превышать 140 символов.');


let errorMessage = '';

const error = () => errorMessage;

const isValidHashtags = (value) => {
  errorMessage = '';

  const inputText = value.toLowerCase().trim();

  if (inputText.length === 0) {
    return true;
  }

  const inputArray = inputText.split(/\s+/);

  const rules = [
    {
      check: inputArray.some((item) => item === '#'),
      error: 'Хештег не может состоять из одной решетки',
    },
    {
      check: inputArray.some((item) => item.slice(1).includes('#')),
      error: 'Хештеги разделяются пробелами',
    },
    {
      check: inputArray.some((item) => item[0] !== '#'),
      error: 'Хештег должен начинаться с символа \'#\'',
    },
    {
      check: inputArray.some((item, num, array) => array.includes(item, num + 1)),
      error: 'Хештеги не должны повторяться',
    },
    {
      check: inputArray.some((item) => item.length > MAX_SYMBOLS),
      error: 'Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решетку',
    },
    {
      check: inputArray.length > 5,
      error: 'Нельзя указать больше 5 хештегов',
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessage = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(imageHashtags, isValidHashtags, error);

form.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const validation = pristine.validate();
  if (validation) {
    form.submit();
  }
});

uploadCloseButton.addEventListener('click', closeUploadImgModal);
