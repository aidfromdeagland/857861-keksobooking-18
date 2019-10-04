'use strict';

var map = document.querySelector('.map');
var ENTER_KEYCODE = 13;
// var ESC_KEYCODE = 27;
var LOCATION_MIN_X = 0;
var LOCATION_MAX_X = map.offsetWidth;
var LOCATION_MIN_Y = 130;
var LOCATION_MAX_Y = 630;
var ADVERT_MAXIMUM_PRICE = 1000000;
var ADVERT_MINIMUM_PRICE = 0;
var MIN_ROOMS = 1;
var MAX_ROOMS = 3;
var MIN_GUESTS = 1;
var MAX_GUESTS = 3;
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
var PIN_MAIN_TAIL_HEIGHT = 20;
var REALTY_MIN_COSTS = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};

var TITLE_MIN_LENGTH = 30;
var TITLE_MAX_LENGTH = 100;
var ROOM_CAPACITY_MAXIMUM = {
  'rooms': [1, 2, 3, 100],
  'guests': [1, 2, 3, 0]
};

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
        'price': getRandomIntInclusive(ADVERT_MINIMUM_PRICE, ADVERT_MAXIMUM_PRICE),
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

var fieldsetCollection = document.querySelectorAll('fieldset');
var mapFilters = document.querySelector('.map__filters');
var advertForm = document.querySelector('.ad-form');
var advertAddress = advertForm.querySelector('#address');
var mapFiltersSelectCollection = mapFilters.querySelectorAll('select');
var pinMain = document.querySelector('.map__pin--main');

var setFormActivity = function (status) {
  if (status === 'activate') {
    for (var i = 0; i < fieldsetCollection.length; i++) {
      fieldsetCollection[i].disabled = false;
    }

    for (i = 0; i < mapFiltersSelectCollection.length; i++) {
      mapFiltersSelectCollection[i].disabled = false;
    }
  }

  if (status === 'deactivate') {
    for (i = 0; i < fieldsetCollection.length; i++) {
      fieldsetCollection[i].disabled = true;
    }

    for (i = 0; i < mapFiltersSelectCollection.length; i++) {
      mapFiltersSelectCollection[i].disabled = true;
    }
  }
};

advertAddress.value = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.round(pinMain.offsetTop + pinMain.offsetHeight / 2);

var activatePageByMouse = function () {
  map.classList.remove('map--faded');
  advertForm.classList.remove('ad-form--disabled');
  setFormActivity('active');

  advertAddress.value = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.round(pinMain.offsetTop + pinMain.offsetHeight + PIN_MAIN_TAIL_HEIGHT);

  pinMain.removeEventListener('mousedown', activatePageByMouse);

  drawPins(apartments.length); // генерация пинов
};

var activatePageByEnter = function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    activatePageByMouse();
    pinMain.removeEventListener('keydown', activatePageByEnter);
  }
};

pinMain.addEventListener('mousedown', activatePageByMouse);
pinMain.addEventListener('keydown', activatePageByEnter);

var advertTitle = advertForm.querySelector('#title');
var advertPrice = advertForm.querySelector('#price');
var advertType = advertForm.querySelector('#type');
var advertTimeIn = advertForm.querySelector('#timein');
var advertTimeOut = advertForm.querySelector('#timeout');
var advertRoomNumber = advertForm.querySelector('#room_number');
var advertCapacity = advertForm.querySelector('#capacity');

advertTitle.required = true;
advertPrice.required = true;
advertPrice.max = ADVERT_MAXIMUM_PRICE;

var validateTitle = function () {
  if (advertTitle.value.length < TITLE_MIN_LENGTH || advertTitle.value.length > TITLE_MAX_LENGTH) {
    advertTitle.setCustomValidity('Длина заголовка: от 30 до 100 кексимволов');
  } else {
    advertTitle.setCustomValidity('');
    advertTitle.style.outline = 'none';
  }
};

var validateRooms = function () {
  if (Number(advertCapacity.value) > ROOM_CAPACITY_MAXIMUM.guests[ROOM_CAPACITY_MAXIMUM.rooms.indexOf(Number(advertRoomNumber.value))]) {
    advertRoomNumber.setCustomValidity('Для указанного количества гостей не подходит данное количество комнат');
  } else {
    advertRoomNumber.setCustomValidity('');
    advertRoomNumber.style.outline = 'none';
  }
};

var validateMinPrice = function () {
  if (Number(advertPrice.value) < REALTY_MIN_COSTS[advertType.value] && Number(advertPrice.value) > 0) {
    advertPrice.setCustomValidity('Нет демпингу на Кексобукинге! Минимальная цена: ' + REALTY_MIN_COSTS[advertType.value] + ' рублей.');
  } else {
    advertPrice.setCustomValidity('');
    advertPrice.style.outline = 'none';
  }
};

var setPricePlaceholder = function () {
  advertPrice.placeholder = REALTY_MIN_COSTS[advertType.value];
};

var syncTimeIn = function () {
  advertTimeIn.value = advertTimeOut.value;
};

var syncTimeOut = function () {
  advertTimeOut.value = advertTimeIn.value;
};

var markInvalids = function (evt) {
  evt.target.style.outline = '5px solid red';
};

setPricePlaceholder();
syncTimeOut();
validateTitle();
validateRooms();
validateMinPrice();

advertTitle.addEventListener('input', validateTitle);
advertRoomNumber.addEventListener('input', validateRooms);
advertCapacity.addEventListener('input', validateRooms);
advertType.addEventListener('input', setPricePlaceholder);
advertType.addEventListener('input', validateMinPrice);
advertPrice.addEventListener('input', validateMinPrice);
advertTimeIn.addEventListener('input', syncTimeOut);
advertTimeOut.addEventListener('input', syncTimeIn);
advertForm.addEventListener('invalid', markInvalids, true);
