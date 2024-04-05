const COMMENTS_SHOW_COUNT = 5;

const listSocialComments = document.querySelector('.social__comments');
const socialComment = listSocialComments.querySelector('.social__comment');
const socialShowCommentsCount = document.querySelector('.social__comment-shown-count');
const socialTotalCommentsCount = document.querySelector('.social__comment-total-count');

const commentsLoader = document.querySelector('.comments-loader');

const renderComments = (comments, messageOutput = 0) => {
  const commentsLength = comments.length;
  const visibleCommentsCount = COMMENTS_SHOW_COUNT + (COMMENTS_SHOW_COUNT * messageOutput);
  const resolvedComments = comments.slice(0, visibleCommentsCount);

  commentsLoader.removeEventListener('click', renderComments);

  listSocialComments.innerHTML = '';

  for (const item of resolvedComments) {
    const comment = socialComment.cloneNode(true);
    comment.querySelector('.social__picture').src = item.avatar;
    comment.querySelector('.social__picture').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;

    socialShowCommentsCount.textContent = resolvedComments.length;
    listSocialComments.append(comment);
  }

  socialTotalCommentsCount.textContent = commentsLength;

  if (commentsLength < COMMENTS_SHOW_COUNT || commentsLength <= visibleCommentsCount) {
    commentsLoader.classList.add('hidden');
  } else {
    commentsLoader.classList.remove('hidden');
  }

  const clickHandler = () => {
    renderComments(comments, messageOutput + 1, clickHandler);
  };

  commentsLoader.addEventListener('click', clickHandler);
};

const closeComments = () => {
  const comments = document.querySelectorAll('.social__comment');
  comments.forEach((item) => item.remove());
};

export { renderComments, closeComments };
