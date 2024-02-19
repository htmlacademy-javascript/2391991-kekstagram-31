// Функция для проверки длины строки

const checkStr = function (string, maxLength) {
  if (string.length <= maxLength) {
    console.log('Строка короче 20 символов');
  } else {
    console.log('Строка длиннее 10 символов');
  }

  // if (string.length = maxLength) {
  //   console.log ('Длина строки ровно 18 символов');
  // } else {
  //   console.log ('Строка длиннее 10 символов');
  // }

  // if (string.length >= maxLength) {
  //   console.log ('Строка длиннее 10 символов');
  // }

  return string;
};

// Строка короче 20 символов
checkStr('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStr('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStr('проверяемая строка', 10); // false


// Функция для проверки, является ли строка палиндромом.

const palindrome = function (string) {
  string = string.replaceAll(' ', '').toLowerCase();
  const normalizeString = string;
  let reverseString = '';

  for (let i = normalizeString.length - 1; i >= 0; i--) {
    reverseString += normalizeString[i];
  }

  console.log(normalizeString + ' ' + reverseString);

  return reverseString === normalizeString;

};


// Строка является палиндромом
palindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
palindrome('ДовОд'); // true
// Это не палиндром
palindrome('Кекс');  // false
// Это палиндром
palindrome('Лёша на полке клопа нашёл '); // true


// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

const getNumber = function (string) {
  string = string.toString();
  let numberString;
  let result = '';

  for (let i = 0; string.length - 1 >= i; i++) {
    numberString = parseInt(string[i]);
    if (!Number.isNaN(numberString)) {
      result += numberString;
    }
  }
  console.log(result);
  return result;
}

getNumber('2023 год');            // 2023
getNumber('ECMAScript 2022');     // 2022
getNumber('1 кефир, 0.5 батона'); // 105
getNumber('агент 007');           // 7
getNumber('а я томат');           // NaN
getNumber(2023); // 2023
getNumber(-1);   // 1
getNumber(1.5);  // 15
