import {isEscapeKey} from './util.js';
import {addScaleListeners, removeScaleListeners} from './image-scale-editor.js';
import {addEffectsListeners, removeEffectsListeners} from './effect-slider.js';
import { sendData } from './api.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const body = document.querySelector('body');
const form = document.querySelector('.img-upload__form');
const imagePreview = form.querySelector('.img-upload__preview > img');
const imagePreviewEffects = document.querySelectorAll('.effects__preview');
const imageInput = form.querySelector('.img-upload__input');
const imageOverlay = form.querySelector('.img-upload__overlay');
const imageHashtags = form.querySelector('.text__hashtags');
const imageDescription = form.querySelector('.text__description');
const uploadCloseButton = imageOverlay.querySelector('.img-upload__cancel');
const submitButton = form.querySelector('.img-upload__submit');

const successSubmition = document.querySelector('#success').content;
const errorSubmition = document.querySelector('#error').content;

body.appendChild(successSubmition);
const successMessage = body.querySelector('.success');
successMessage.classList.add('hidden');

body.appendChild(errorSubmition);
const errorMessage = body.querySelector('.error');
errorMessage.classList.add('hidden');

const successInner = successMessage.querySelector('.success__inner');
const errorInner = errorMessage.querySelector('.error__inner');

const errorButton = errorInner.querySelector('.error__button');
const successButton = successInner.querySelector('.success__button');

const MAX_SYMBOLS = 20;
const MAX_HASHTAGS = 5;

const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text__error'
});

const onDocumentKeydown = function (keydownEvt) {
  if (isEscapeKey(keydownEvt) && document.activeElement !== imageDescription &&
      document.activeElement !== imageHashtags && errorMessage.classList.contains('hidden')) {
    keydownEvt.preventDefault();
    closeUploadImgModal();
  }
};

const closeSuccessByClick = (clickEvt) => {
  if (!clickEvt.composedPath().includes(successInner)) {
    successMessage.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByClick = (clickEvt) => {
  if (!clickEvt.composedPath().includes(errorInner)) {
    errorMessage.classList.add('hidden');
    removeErrorListeners();
  }
};

const closeSuccessByKeydown = (keydownEvt) => {
  if (isEscapeKey(keydownEvt)) {
    successMessage.classList.add('hidden');
    removeSuccessListeners();
  }
};

const closeErrorByKeydown = (keydownEvt) => {
  if (isEscapeKey(keydownEvt)) {
    errorMessage.classList.add('hidden');
    removeErrorListeners();
  }
};

const onSuccessButton = () => {
  successMessage.classList.add('hidden');
  removeSuccessListeners();
};

const onErrorButton = () => {
  errorMessage.classList.add('hidden');
  removeErrorListeners();
};

const handleSuccessMessage = function () {
  document.addEventListener('click', closeSuccessByClick);
  document.addEventListener('keydown', closeSuccessByKeydown);
  successButton.addEventListener('click', onSuccessButton);
};

function removeSuccessListeners () {
  document.removeEventListener('click', closeSuccessByClick);
  document.removeEventListener('keydown', closeSuccessByKeydown);
  successButton.removeEventListener('click', onSuccessButton);
}

const handleErrorMessage = function () {
  document.addEventListener('click', closeErrorByClick);
  document.addEventListener('keydown', closeErrorByKeydown);
  errorButton.addEventListener('click', onErrorButton);
};

function removeErrorListeners () {
  document.removeEventListener('click', closeErrorByClick);
  document.removeEventListener('keydown', closeErrorByKeydown);
  errorButton.removeEventListener('click', onErrorButton);
}

function validateDescription (value) {
  return value.length <= 140;
}

pristine.addValidator(imageDescription, validateDescription, 'Длина комментария не может превышать 140 символов.');

let errorMessageHashtags = '';

const error = () => errorMessageHashtags;

const isValidHashtags = (value) => {
  errorMessageHashtags = '';

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
      error: `Максимальная длина одного хештега ${MAX_SYMBOLS} символов, включая решетку`,
    },
    {
      check: inputArray.length > MAX_HASHTAGS,
      error: `Нельзя указать больше ${MAX_HASHTAGS} хештегов`,
    },
    {
      check: inputArray.some((item) => !/^#[a-zа-яё0-9]{1,19}$/i.test(item)),
      error: 'Хештег содержит недопустимые символы',
    },
  ];

  return rules.every((rule) => {
    const isInvalid = rule.check;
    if(isInvalid) {
      errorMessageHashtags = rule.error;
    }
    return !isInvalid;
  });
};

pristine.addValidator(imageHashtags, isValidHashtags, error);

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const validation = pristine.validate();
    if (validation) {
      submitButton.disabled = true;
      sendData(new FormData(evt.target))
        .then(() => {
          closeUploadImgModal();
          successMessage.classList.remove('hidden');
          handleSuccessMessage();
        })
        .catch(() => {
          errorMessage.classList.remove('hidden');
          handleErrorMessage();
        })
        .finally(() => {
          submitButton.disabled = false;
        });
    }
  });

};

imageInput.addEventListener('change', () => {
  imageOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  const file = imageInput.files[0];
  const fileName = file.name.toLowerCase();
  const fileExt = fileName.split('.').pop();
  const matches = FILE_TYPES.includes(fileExt);
  if (matches) {
    const url = URL.createObjectURL(file);
    imagePreview.src = url;
    imagePreviewEffects.forEach((item) => {
      item.style.backgroundImage = `url(${url})`;
    });
  } else {
    return;
  }

  addScaleListeners();
  addEffectsListeners();

  document.addEventListener('keydown', onDocumentKeydown);

  pristine.validate();
});

function closeUploadImgModal () {
  document.removeEventListener('keydown', onDocumentKeydown);

  removeScaleListeners();
  removeEffectsListeners();

  imageOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
}

uploadCloseButton.addEventListener('click', closeUploadImgModal);

export {setUserFormSubmit};
