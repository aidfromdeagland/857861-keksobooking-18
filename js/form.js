'use strict';

(function () {
  var ADVERT_MAXIMUM_PRICE = 1000000;
  var ADVERT_MINIMUM_PRICE = 0;
  var RealtyMinCost = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  var TITLE_MIN_LENGTH = 30;
  var TITLE_MAX_LENGTH = 100;
  var MaxCapacityPerRooms = {
    '1': 1,
    '2': 2,
    '3': 3,
    '0': 100
  };

  var mapFiltersForm = document.querySelector('.map__filters');
  var advertForm = document.querySelector('.ad-form');
  var advertAddress = advertForm.querySelector('#address');
  var advertReset = advertForm.querySelector('.ad-form__reset');

  var disableForm = function (form, isActive) {
    var selectsAndFieldsets = form.querySelectorAll('select, fieldset');

    selectsAndFieldsets.forEach(function (item) {
      item.disabled = isActive;
    });
  };

  advertAddress.readOnly = true;

  var setFormAddress = function (type) {
    var tail = window.map.PinMainData.TAIL_HEIGHT;
    var divider = 1;

    if (type === 'initial') {
      tail = 0;
      divider = 2;
    }

    var coordX = window.map.pinMain.offsetLeft + window.map.pinMain.offsetWidth / 2;
    var coordY = window.map.pinMain.offsetTop + window.map.pinMain.offsetHeight / divider + tail;

    advertAddress.value = Math.round(coordX) + ', ' + Math.round(coordY);
  };

  setFormAddress('initial');

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
  advertPrice.min = ADVERT_MINIMUM_PRICE;

  var disableInputsOutline = function () {
    advertTitle.style.outline = 'none';
    advertRoomNumber.style.outline = 'none';
    advertPrice.style.outline = 'none';
  };

  var validateTitle = function () {
    if (advertTitle.value.length < TITLE_MIN_LENGTH || advertTitle.value.length > TITLE_MAX_LENGTH) {
      advertTitle.setCustomValidity('Длина заголовка: от 30 до 100 кексимволов');
    } else {
      advertTitle.setCustomValidity('');
      advertTitle.style.outline = 'none';
    }
  };

  var validateRooms = function () {
    if (Number(advertRoomNumber.value) < MaxCapacityPerRooms[Number(advertCapacity.value)] ||
    Number(advertRoomNumber.value) === 100 && Number(advertCapacity.value) !== 0) {
      advertRoomNumber.setCustomValidity('Для указанного количества гостей не подходит данное количество комнат');
    } else {
      advertRoomNumber.setCustomValidity('');
      advertRoomNumber.style.outline = 'none';
    }
  };

  var validateMinPrice = function () {
    if (Number(advertPrice.value) < RealtyMinCost[advertType.value] && Number(advertPrice.value) > 0) {
      advertPrice.setCustomValidity('Нет демпингу на Кексобукинге! Минимальная цена: ' + RealtyMinCost[advertType.value] + ' рублей.');
    } else {
      advertPrice.setCustomValidity('');
      advertPrice.style.outline = 'none';
    }
  };

  var setPricePlaceholder = function () {
    advertPrice.placeholder = RealtyMinCost[advertType.value];
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

  var validateCombo = function () {
    validateTitle();
    validateRooms();
    validateMinPrice();
  };

  var addFormListeners = function () {
    advertTitle.addEventListener('input', validateTitle);
    advertRoomNumber.addEventListener('input', validateRooms);
    advertCapacity.addEventListener('input', validateRooms);
    advertType.addEventListener('input', setPricePlaceholder);
    advertType.addEventListener('input', validateMinPrice);
    advertPrice.addEventListener('input', validateMinPrice);
    advertTimeIn.addEventListener('input', syncTimeOut);
    advertTimeOut.addEventListener('input', syncTimeIn);
    advertForm.addEventListener('invalid', markInvalids, true);
  };

  var removeFormListeners = function () {
    advertTitle.removeEventListener('input', validateTitle);
    advertRoomNumber.removeEventListener('input', validateRooms);
    advertCapacity.removeEventListener('input', validateRooms);
    advertType.removeEventListener('input', setPricePlaceholder);
    advertType.removeEventListener('input', validateMinPrice);
    advertPrice.removeEventListener('input', validateMinPrice);
    advertTimeIn.removeEventListener('input', syncTimeOut);
    advertTimeOut.removeEventListener('input', syncTimeIn);
    advertForm.removeEventListener('invalid', markInvalids, true);
  };

  var activateForm = function () {
    advertForm.classList.remove('ad-form--disabled');
    disableForm(advertForm, false);
    setPricePlaceholder();
    syncTimeOut();
    validateCombo();
    setFormAddress();
    addFormListeners();
  };

  var deactivateForm = function () {
    advertForm.reset();
    mapFiltersForm.reset();
    setFormAddress('initial');
    setPricePlaceholder();
    window.map.deletePins();
    window.card.removeCard();
    advertForm.classList.add('ad-form--disabled');
    disableForm(advertForm, true);
    disableForm(mapFiltersForm, true);
    disableInputsOutline();
    removeFormListeners();
  };

  advertReset.addEventListener('click', function (evt) {
    evt.preventDefault();
    window.map.deactivatePage();
  });

  window.form = {
    advertForm: advertForm,
    advertAddress: advertAddress,
    mapFiltersForm: mapFiltersForm,
    disableForm: disableForm,
    setFormAddress: setFormAddress,
    activateForm: activateForm,
    deactivateForm: deactivateForm,
  };

  window.map.deactivatePage();
})();
