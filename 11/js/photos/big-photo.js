import {isEscapeKey} from '../util.js';
import {renderComments, closeComments} from '../comments.js';
import { publicationPhotos } from '../photos/thumbnails.js';

const body = document.querySelector('body');
const pictures = document.querySelectorAll('.picture');

const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');
const bigPictureImg = bigPicture.querySelector('.big-picture__img img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    bigPictureClose();
  }
};

function bigPictureOpen (photo) {
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  bigPictureImg.src = photo.url;
  bigPictureLikes.textContent = photo.likes;
  bigPictureSocialCaption.textContent = photo.description;

  renderComments(photo.comments);
  document.addEventListener('keydown', onDocumentKeydown);
}

function bigPictureClose () {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
  closeComments();
  document.removeEventListener('keydown', onDocumentKeydown);
}

const clickHandlerPicture = (evt, i) => {
  evt.preventDefault();
  const clickPictureId = i + 1;
  const finishPhoto = publicationPhotos.find((photo) => photo.id === clickPictureId);
  bigPictureOpen(finishPhoto);
};

pictures.forEach((picture, i) => picture.addEventListener('click', (evt) => clickHandlerPicture(evt, i)));

bigPictureCancel.addEventListener('click', () => {
  bigPictureClose();
});
