// import { similarUser } from './data.js';
import './util.js';
import { setUserFormSubmit } from './form-validation.js';
import { clickHandlerPicture } from './photos/big-photo.js';

import { renderPublicationPhotos } from './photos/thumbnails.js';
import { getData } from './api.js';

getData().then((photos) => {
  renderPublicationPhotos(photos);

  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture, i) => {
    picture.addEventListener('click', (evt) => {
      clickHandlerPicture(evt, i, photos);
    })
  })
});

setUserFormSubmit();
