// const body = document.querySelector('body');
// const errorTemplate = document.querySelector('#data-error').content;

const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram/data';

const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};

const Method = {
  POST: 'POST',
};

const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};

// const errorShow = () => {
//   body.append(errorTemplate);
//   setTimeout(() => {
//     const error = body.querySelector('.data-error');
//     body.removeChild(error);
//   }, 5000);
// };

const load = (route, method = Method.GET, body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
  .then((response) => {
    if (!response.ok) {
      throw new Error();
    }
    return response.json();
  })
  .catch(() => {
    throw new Error(ErrorText);
  });

const getData = () => load(Route.GET_DATA, ErrorText.GET_DATA);

const sendData = (body) => load(Route.SEND_DATA, ErrorText.SEND_DATA, Method.POST, body);

export {getData, sendData};
