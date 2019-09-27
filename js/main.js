'use strict';

var getRandomIntInclusive = function (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

var getRandomArray = function (sourceArray) {
  var randomLength = getRandomIntInclusive(0, sourceArray.length);
  var newArray = sourceArray.slice();
  for (var i = newArray.length; i > randomLength; i--) {
    newArray.splice(getRandomIntInclusive(0, newArray.length), 1);
  }
  return newArray;
};

var generateArray = function () {
  var arr = [];
  var elementsQuantity = 8;
  var MIN_PRICE = 100;
  var MAX_PRICE = 3200;
  var MIN_ROOMS = 1;
  var MAX_ROOMS = 8;
  var MIN_GUESTS = 1;
  var MAX_GUESTS = 11;
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECK_TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTO_URLS = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ];

  for (var i = 0; i < elementsQuantity; i++) {
    var realtyObject = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'},

      'offer': {
        'title': 'Заголовок ' + (i + 1),
        'address': '696, 1337',
        'price': getRandomIntInclusive(MIN_PRICE, MAX_PRICE),
        'type': TYPES[getRandomIntInclusive(0, TYPES.length - 1)],
        'rooms': getRandomIntInclusive(MIN_ROOMS, MAX_ROOMS),
        'guests': getRandomIntInclusive(MIN_GUESTS, MAX_GUESTS),
        'checkin': CHECK_TIMES[getRandomIntInclusive(0, CHECK_TIMES.length - 1)],
        'checkout': CHECK_TIMES[getRandomIntInclusive(0, CHECK_TIMES.length - 1)],
        'features': getRandomArray(FEATURES),
        'description': 'соседи тихие, потолки высокие',
        'photos': getRandomArray(PHOTO_URLS)
      },

      'location': {
        'x': getRandomIntInclusive(0, map.offsetWidth),
        'y': getRandomIntInclusive(130, 630)
      }
    };
    arr.push(realtyObject);
  }
  return arr;
};

var map = document.querySelector('.map');

map.classList.remove('map--faded');

var pin = document.querySelector('#pin').content.querySelector('.map__pin');
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var apartments = generateArray();
var pinsArea = document.querySelector('.map__pins');
var fragmentPins = document.createDocumentFragment();

var generatePin = function (index) {
  var clonedPin = pin.cloneNode(true);
  clonedPin.style = 'left: ' + (apartments[index].location.x - PIN_WIDTH / 2) +
  'px; top: ' + (apartments[index].location.y - PIN_HEIGHT) + 'px;';
  clonedPin.firstElementChild.src = apartments[index].author.avatar;
  clonedPin.firstElementChild.alt = apartments[index].offer.description;
  return clonedPin;
};

var drawPins = function (pinsQuantity) {
  for (var i = 0; i < pinsQuantity; i++) {
    fragmentPins.appendChild(generatePin(i));
  }
  pinsArea.appendChild(fragmentPins);
};

drawPins(apartments.length);
