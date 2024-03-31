// import { similarUser } from '../data.js';

const pictures = document.querySelector('.pictures');

const template = document.querySelector('#picture').content.querySelector('.picture');

// const photos = similarUser();

let publicationPhotos;

const renderPublicationPhotos = (photos) => {
  const photosFragment = document.createDocumentFragment();

  publicationPhotos = photos;

  photos.forEach(({url, description, likes, comments}) => {
    const photo = template.cloneNode(true);
    photo.querySelector('.picture__img').src = url;
    photo.querySelector('.picture__img').alt = description;
    photo.querySelector('.picture__likes').textContent = likes;
    photo.querySelector('.picture__comments').textContent = comments.length;

    photosFragment.appendChild(photo);
  });

  pictures.appendChild(photosFragment);
};

export { publicationPhotos, renderPublicationPhotos };
