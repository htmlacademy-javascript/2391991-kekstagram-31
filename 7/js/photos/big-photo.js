import {isEscapeKey, isEnterKey } from '../util.js';
import { photos } from '../photos/thumbnails.js';


// /*
// Для отображения окна нужно удалять класс hidden у элемента .big-picture и каждый раз заполнять его данными о конкретной фотографии:

// Адрес изображения url подставьте как src изображения внутри блока .big-picture__img.

// Количество лайков likes подставьте как текстовое содержание элемента .likes-count.

// Количество показанных комментариев подставьте как текстовое содержание элемента .social__comment-shown-count.

// Общее количество комментариев к фотографии comments подставьте как текстовое содержание элемента .social__comment-total-count.

// Список комментариев под фотографией: комментарии должны вставляться в блок .social__comments. Разметка каждого комментария должна выглядеть так:

// <li class="social__comment">
//   <img
//     class="social__picture"
//     src="{{аватар}}"
//     alt="{{имя комментатора}}"
//     width="35" height="35">
//   <p class="social__text">{{текст комментария}}</p>
// </li>

//         Копировать

// Описание фотографии description вставьте строкой в блок .social__caption.
// */

const body = document.querySelector('body');


const picturesContainer = document.querySelector('.pictures');

const bigPicture = document.querySelector('.big-picture');
// bigPicture.classList.remove('hidden');

const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const bigPictureLikes = bigPicture.querySelector('.likes-count');
const bigPictureShowComments = bigPicture.querySelector('.social__comment-shown-count');
const bigPictureTotalComments = bigPicture.querySelector('.social__comment-total-count');
const bigPictureSocialCaption = bigPicture.querySelector('.social__caption');

const bigSocialComments = document.querySelector('.social__comments');
const socialComments = bigSocialComments.querySelector('.social__comment');

const socialCommentCount = document.querySelector('.social__comment-count');
const commentsLoader = document.querySelector('.comments-loader');
socialCommentCount.classList.add('hidden');
commentsLoader.classList.add('hidden');

