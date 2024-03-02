// Функция для проверки длины строки

const checkStr = (string, maxLength) => (string.length <= maxLength);
console.log('Строка больше 20 символов');

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


// Функции возвращаются

/*
Напишите функцию, которая принимает время начала и конца рабочего дня, а также время старта и продолжительность встречи в минутах и возвращает true,
если встреча не выходит за рамки рабочего дня, и false, если выходит.

Время указывается в виде строки в формате часы:минуты. Для указания часов и минут могут использоваться как две цифры, так и одна.
Например, 8 часов 5 минут могут быть указаны по-разному: 08:05, 8:5, 08:5 или 8:05.

Продолжительность задаётся числом. Гарантируется, что и рабочий день, и встреча укладываются в одни календарные сутки.


'8:00' - начало рабочего дня
'17:30' - конец рабочего дня
'14:00' - начало встречи
90 - продолжительность встречи в минутах

имяФункции('08:00', '17:30', '14:00', 90); // true
имяФункции('8:0', '10:0', '8:0', 120);     // true
имяФункции('08:00', '14:30', '14:00', 90); // false
имяФункции('14:00', '17:30', '08:0', 90);  // false
имяФункции('8:00', '17:30', '08:00', 900); // false
*/

const stringToDigits = (string) => string.split(':').map((item) => Number(item));
const timeToMinutes = (time) => stringToDigits(time)[0] * 60 + stringToDigits(time)[1];

const checkMeetingTime = (startWorkingDay, endWorkingDay, startMeeting, durationMeeting) => {
  const startWorkingDayMin = timeToMinutes(startWorkingDay);
  const endWorkingDayMin = timeToMinutes(endWorkingDay);
  const startMeetingMin = timeToMinutes(startMeeting);

  if (startMeetingMin < startWorkingDayMin || startMeetingMin + durationMeeting > endWorkingDayMin) {
    return false;
  }
  return true;
};

checkMeetingTime('08:00', '17:30', '14:00', 90); // true
checkMeetingTime('8:0', '10:0', '8:0', 120);     // true
checkMeetingTime('08:00', '14:30', '14:00', 90); // false
checkMeetingTime('14:00', '17:30', '08:0', 90);  // false
checkMeetingTime('8:00', '17:30', '08:00', 900); // false

console.log(checkMeetingTime('08:00', '17:30', '14:00', 90));
console.log(checkMeetingTime('8:0', '10:0', '8:0', 120));
console.log(checkMeetingTime('08:00', '14:30', '14:00', 90));
console.log(checkMeetingTime('14:00', '17:30', '08:0', 90));
console.log(checkMeetingTime('8:00', '17:30', '08:00', 900));
