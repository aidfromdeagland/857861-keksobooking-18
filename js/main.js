'use strict';

var map = document.querySelector('.map');

var LOCATION_MIN_X = 0;
var LOCATION_MAX_X = map.offsetWidth;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
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
var ELEMENTS_QUANTITY = 8;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;

map.classList.remove('map--faded');

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

var generatePins = function () {
  var arr = [];

  for (var i = 0; i < ELEMENTS_QUANTITY; i++) {
    var realtyObject = {
      'author': {
        'avatar': 'img/avatars/user0' + (i + 1) + '.png'},

      'offer': {
        'title': 'Заголовок ' + (i + 1),
        'address': '',
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
        'x': getRandomIntInclusive(LOCATION_MIN_X, LOCATION_MAX_X),
        'y': getRandomIntInclusive(LOCATION_MIN_Y, LOCATION_MAX_Y)
      }
    };
    realtyObject.offer.address =
    realtyObject.location.x + ', ' + realtyObject.location.y;
    arr.push(realtyObject);
  }
  return arr;
};

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var apartments = generatePins();
var pinsArea = document.querySelector('.map__pins');
var fragmentPins = document.createDocumentFragment();

var generatePin = function (index) {
  var clonedPin = pinTemplate.cloneNode(true);
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
