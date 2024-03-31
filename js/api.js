const ErrorText = {
  GET_DATA: 'Не удалось загрузить данные. Попробуйте обновить страницу',
  SEND_DATA: 'Не удалось отправить форму. Попробуйте ещё раз',
};


const getData = () => fetch('https://31.javascript.htmlacademy.pro/kekstagram/data').then((response) => {
  if (!response.ok) {
    throw new Error();
  }
  return response.json();
})
.catch(() => {
  throw new Error(ErrorText.GET_DATA);
});

const sendData = (requestBody) => fetch('https://31.javascript.htmlacademy.pro/kekstagram', {method: 'POST', body: requestBody})
.then((response) => {
  if (!response.ok) {
    throw new Error();
  }
})
.catch(() => {
  throw new Error(ErrorText.SEND_DATA);
});

export {getData, sendData};
