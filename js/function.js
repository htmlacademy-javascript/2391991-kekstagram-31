// Функция для проверки длины строки

const checkStr = (string, maxLength) => (string.length <= maxLength);

// Строка короче 20 символов
checkStr('проверяемая строка', 20);
// Длина строки ровно 18 символов
checkStr('проверяемая строка', 18);
// Строка длиннее 10 символов
checkStr('проверяемая строка', 10);

// Функция для проверки, является ли строка палиндромом.

const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let reversedString = '';

  for (let i = string.length - 1; i >= 0; i--) {
    reversedString += string[i];
  }
  return string === reversedString;
};

// Строка является палиндромом
isPalindrome('топот');
// Несмотря на разный регистр, тоже палиндром
isPalindrome('ДовОд');
// Это не палиндром
isPalindrome('Кекс');
// Это палиндром
isPalindrome('Лёша на полке клопа нашёл ');

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
  return result;
};

getNumber('2023 год');
getNumber('ECMAScript 2022');
getNumber('1 кефир, 0.5 батона');
getNumber('агент 007');
getNumber('а я томат');
getNumber(2023);
getNumber(-1);
getNumber(1.5);

// Функции возвращаются

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

checkMeetingTime('08:00', '17:30', '14:00', 90);
checkMeetingTime('8:0', '10:0', '8:0', 120);
checkMeetingTime('08:00', '14:30', '14:00', 90);
checkMeetingTime('14:00', '17:30', '08:0', 90);
checkMeetingTime('8:00', '17:30', '08:00', 900);
