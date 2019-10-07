'use strict';

(function () {
  var ADVERT_MAXIMUM_PRICE = 1000000;
  var ADVERT_MINIMUM_PRICE = 0;
  var PIN_MAIN_TAIL_HEIGHT = 20;
  var REALTY_MIN_COSTS = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var MAX_CAPACITY_PER_ROOMS = {
    '1': 1,
    '2': 2,
    '3': 3,
    '0': 100
  };

  var fieldsetCollection = document.querySelectorAll('fieldset');
  var mapFilters = document.querySelector('.map__filters');
  var advertForm = document.querySelector('.ad-form');
  var advertAddress = advertForm.querySelector('#address');
  var mapFiltersSelectCollection = mapFilters.querySelectorAll('select');
  var pinMain = document.querySelector('.map__pin--main');

  var disableForm = function (boolean) {
    for (var i = 0; i < fieldsetCollection.length; i++) {
      fieldsetCollection[i].disabled = boolean;
    }

    for (i = 0; i < mapFiltersSelectCollection.length; i++) {
      mapFiltersSelectCollection[i].disabled = boolean;
    }
  }; // arguments: true or false

  var setFormActivity = function (status) {
    if (status === 'activate') {
      disableForm(false);
    }

    if (status === 'deactivate') {
      disableForm(true);
    }
  }; // arguments: activate or deactivate

  advertAddress.value = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.round(pinMain.offsetTop + pinMain.offsetHeight / 2);

  var activatePageByMouse = function () {
    window.util.map.classList.remove('map--faded');
    advertForm.classList.remove('ad-form--disabled');
    setFormActivity('activate');

    advertAddress.value = Math.round(pinMain.offsetLeft + pinMain.offsetWidth / 2) + ', ' + Math.round(pinMain.offsetTop + pinMain.offsetHeight + PIN_MAIN_TAIL_HEIGHT);

    pinMain.removeEventListener('mousedown', activatePageByMouse);

    window.map.drawPins(window.data.apartments.length); // генерация пинов
  };

  var activatePageByEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
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
    if (Number(advertRoomNumber.value) < MAX_CAPACITY_PER_ROOMS[Number(advertCapacity.value)] ||
    Number(advertRoomNumber.value) === 100 && Number(advertCapacity.value) !== 0) {
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

  window.form = {
    ADVERT_MINIMUM_PRICE: ADVERT_MINIMUM_PRICE,
    ADVERT_MAXIMUM_PRICE: ADVERT_MAXIMUM_PRICE,
    REALTY_MIN_COSTS: REALTY_MIN_COSTS
  };
})();
