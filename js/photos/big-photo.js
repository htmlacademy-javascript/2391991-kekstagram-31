import {isEscapeKey} from '../util.js';
import { photos } from '../photos/thumbnails.js';

const body = document.querySelector('body');
const pictures = document.querySelectorAll('.picture');

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureImgUrl = bigPictureImg.querySelector('img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');

// const bigPictureShowComments = bigPicture.querySelector('.social__comment-shown-count');
// const bigPictureTotalComments = bigPicture.querySelector('.social__comment-total-count');
// const bigSocialComments = document.querySelector('.social__comments');
// const socialComments = bigSocialComments.querySelector('.social__comment');

const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

function bigPictureOpen (photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImgUrl.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureSocialCaption.textContent = photo.description;



  document.addEventListener('keydown', onDocumentKeydown);
}

function bigPictureClose () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');



  document.removeEventListener('keydown', onDocumentKeydown);
}

const clickHandlerPicture = (evt, i) => {
  evt.preventDefault();
  const idX = i + 1;
  const finishPhoto = photos.find((photo) => photo.id === idX);
  bigPictureOpen(finishPhoto);
};

pictures.forEach((picture, i) => picture.addEventListener('click', (evt) => clickHandlerPicture(evt, i)));

bigPictureCancel.addEventListener('click', () => {
  bigPictureClose();
});
