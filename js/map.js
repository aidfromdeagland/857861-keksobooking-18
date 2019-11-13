'use strict';

(function () {
  var DATA_QUANTITY = 5;
  var pinMain = document.querySelector('.map__pin--main');

  var PinData = {
    WIDTH: 50,
    HEIGHT: 70
  };

  var PinMainData = {
    TAIL_HEIGHT: 18,
    WIDTH: 65,
    HEIGHT: 65,
    DEFAULT_X: pinMain.offsetLeft,
    DEFAULT_Y: pinMain.offsetTop
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsArea = document.querySelector('.map__pins');
  window.appendedPins = [];
  window.loadedData = [];

  var renderPin = function (item) {
    var clonedPin = pinTemplate.cloneNode(true);
    clonedPin.style.left = (item.location.x - PinData.WIDTH / 2) + 'px';
    clonedPin.style.top = (item.location.y - PinData.HEIGHT) + 'px';
    clonedPin.firstElementChild.src = item.author.avatar;
    clonedPin.firstElementChild.alt = item.offer.description;
    return clonedPin;
  };

  var drawPins = function (adList) {
    var fragmentPins = document.createDocumentFragment();
    var adListLimited = adList.filter(function (item) {
      return item.offer;
    }).slice(0, DATA_QUANTITY);

    adListLimited.forEach(function (item) {
      var renderedPin = renderPin(item);
      renderedPin.addEventListener('click', function (evt) {
        evt.preventDefault();
        window.card.show(item);
        evt.currentTarget.classList.add('.map__pin--active');
      });
      window.appendedPins.push(renderedPin);
      fragmentPins.appendChild(renderedPin);
    });
    pinsArea.appendChild(fragmentPins);
  };

  var deletePins = function () {
    window.appendedPins.forEach(function (item) {
      pinsArea.removeChild(item);
    });
    window.appendedPins = [];
  };

  var respawnPin = function () {
    pinMain.style.left = (PinMainData.DEFAULT_X) + 'px';
    pinMain.style.top = (PinMainData.DEFAULT_Y) + 'px';
    window.form.setAddress('initial');
  };

  var formSubmitHandler = function (evt) {
    evt.preventDefault();
    var formData = new FormData(window.form.advert);
    window.server.upload(formData, window.modal.showSuccess, window.modal.showError);
  };

  var mainPinMousedownHandler = function () {
    window.util.map.classList.remove('map--faded');
    window.form.activate();
    window.server.load(drawPins, function (errorText) {
      window.modal.showError(errorText);
      deactivatePage();
    });
    window.form.advert.addEventListener('submit', formSubmitHandler);
    pinMain.removeEventListener('mousedown', mainPinMousedownHandler);
  };

  var mainPinKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      mainPinMousedownHandler();
      pinMain.removeEventListener('keydown', mainPinKeydownHandler);
    }
  };

  var deactivatePage = function () {
    window.util.map.classList.add('map--faded');
    window.form.deactivate();
    respawnPin();
    window.removeLoadedImages();
    window.form.advert.removeEventListener('submit', formSubmitHandler);
    pinMain.addEventListener('mousedown', mainPinMousedownHandler);
    pinMain.addEventListener('keydown', mainPinKeydownHandler);
  };

  pinMain.addEventListener('mousedown', mainPinMousedownHandler);
  pinMain.addEventListener('keydown', mainPinKeydownHandler);

  window.map = {
    pinMain: pinMain,
    deactivatePage: deactivatePage,
    drawPins: drawPins,
    PinMainData: PinMainData,
    deletePins: deletePins
  };

  window.dragndrop(pinMain, window.util.map);
})();
