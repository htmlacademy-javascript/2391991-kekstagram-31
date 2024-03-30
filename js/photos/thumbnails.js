// import { similarUser } from '../data.js';

const pictures = document.querySelector('.pictures');

const template = document.querySelector('#picture').content.querySelector('.picture');

// const photos = similarUser();

// const photosFragment = document.createDocumentFragment();

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


// photos.forEach(({id, url, likes, comments}) => {
//   const pictures = template.cloneNode(true);

//   pictures.dataset.photoId = id;
//   pictures.querySelector('.picture__img').src = url;
//   pictures.querySelector('.picture__likes').textContent = likes;
//   pictures.querySelector('.picture__comments').textContent = comments.length;

//   photosFragment.appendChild(pictures);
// });

// pictures.appendChild(photosFragment);

// export { pictures };
