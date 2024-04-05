import { renderPublicationPhotos, pictures } from './photos/thumbnails';
import { debounce } from './util';

const FILTER = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;

let currentFilter = 'filter-default';
let photos = [];
const filterElement = document.querySelector('.img-filters');
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const debounceRender = debounce(renderPublicationPhotos);

function onFilterChange(evt) {
  const targetButton = evt.target;
  const activeButton = document.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (!targetButton.matches('button')) {
    return;
  }

  if (activeButton === targetButton) {
    return;
  }
  activeButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  targetButton.classList.toggle(ACTIVE_BUTTON_CLASS);
  currentFilter = targetButton.getAttribute('id');

  applyFilter();
}

function isOldPosts () {
  const oldPosts = pictures.querySelectorAll('.picture');
  oldPosts.forEach((photo) => {
    photo.remove();
  });
}

function applyFilter() {

  let filteredPictures = [];
  if (currentFilter === FILTER.default) {
    filteredPictures = photos;
  }
  if (currentFilter === FILTER.random) {
    filteredPictures = photos.toSorted(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
  }
  if (currentFilter === FILTER.discussed) {
    filteredPictures = photos.toSorted(SORTFUNC.discussed);
  }

  isOldPosts();

  debounceRender(filteredPictures);
}

function configFilter(picturesData) {
  filterElement.classList.remove('img-filters--inactive');
  filterElement.addEventListener('click', onFilterChange);
  photos = picturesData;
}

export {configFilter};
