// import { similarUser } from './data.js';
import'./util.js';
import { setUserFormSubmit } from './form-validation.js';
import './photos/big-photo.js';

import { renderPublicationPhotos } from './photos/thumbnails.js';
import { getData } from './api.js';

getData().then((photos) => {
  renderPublicationPhotos(photos);
});

setUserFormSubmit();
