import {showAlert} from './util.js';
import { setUserFormSubmit } from './form-validation.js';
import { clickHandlerPicture } from './photos/big-photo.js';
import { configFilter } from './filter.js';
import { renderPublicationPhotos } from './photos/thumbnails.js';
import { getData } from './api.js';

getData().then((photos) => {
  renderPublicationPhotos(photos);
  configFilter(photos);
  const pictures = document.querySelectorAll('.picture');
  pictures.forEach((picture, i) => {
    picture.addEventListener('click', (evt) => {
      clickHandlerPicture(evt, i, photos);
    });
  });
})
  .catch((err)=>{
    showAlert(err.message);
  });

setUserFormSubmit();
