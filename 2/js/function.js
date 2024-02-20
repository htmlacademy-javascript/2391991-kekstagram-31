// Функция для проверки длины строки

const checkStr = (string, maxLength) => (string.length <= maxLength);
console.log('Строка больше 20 символов')

// Строка короче 20 символов
checkStr('проверяемая строка', 20); // true
// Длина строки ровно 18 символов
checkStr('проверяемая строка', 18); // true
// Строка длиннее 10 символов
checkStr('проверяемая строка', 10); // false


// Функция для проверки, является ли строка палиндромом.

const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }

  console.log(string + ' ' + reversedString);

  return string === reversedString;

};

// Строка является палиндромом
isPalindrome('топот'); // true
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд'); // true
// Это не палиндром
isPalindrome('Кекс');  // false
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл '); // true


// Функция принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

const getNumber = (string) => {
  string = string.toString();
  let numberString;
  let result = '';

  for (let i = 0; string.length - 1 >= i; i++) {
    numberString = parseInt(string[i], 10);
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
