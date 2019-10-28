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

  var renderPin = function (index, adArray) {
    var clonedPin = pinTemplate.cloneNode(true);
    clonedPin.style = 'left: ' + (adArray[index].location.x - PinData.WIDTH / 2) +
    'px; top: ' + (adArray[index].location.y - PinData.HEIGHT) + 'px;';
    clonedPin.firstElementChild.src = adArray[index].author.avatar;
    clonedPin.firstElementChild.alt = adArray[index].offer.description;
    clonedPin.value = index;
    return clonedPin;
  };

  var drawPins = function (adList) {
    var fragmentPins = document.createDocumentFragment();

    for (var i = 0; i < DATA_QUANTITY && i < adList.length; i++) {
      if (adList[i].offer) {
        var renderedPin = renderPin(i, adList);
        renderedPin.addEventListener('click', function (evt) {
          evt.preventDefault();
          var cardNumber = evt.currentTarget.value;
          window.card.showCard(cardNumber, adList);
          var valueSelector = 'button[value="' + window.map.currentPinIndex + '"]';
          if (window.map.currentPinIndex) {
            window.util.map.querySelector(valueSelector).classList.remove('.map__pin--active');
          }
          window.map.currentPinIndex = evt.currentTarget.value;
          evt.currentTarget.classList.add('.map__pin--active');
        });
        document.removeEventListener('keydown', window.card.removeCardKeydownHandler);
        document.addEventListener('keydown', window.card.removeCardKeydownHandler);
        window.appendedPins.push(renderedPin);
        fragmentPins.appendChild(renderedPin);
      }
    }
    pinsArea.appendChild(fragmentPins);
  };

  var deletePins = function () {
    window.appendedPins.forEach(function (item) {
      pinsArea.removeChild(item);
    });
    window.appendedPins = [];
  };

  var respawnPin = function () {
    window.map.pinMain.style.left = (PinMainData.DEFAULT_X) + 'px';
    window.map.pinMain.style.top = (PinMainData.DEFAULT_Y) + 'px';
    window.form.advertAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.PinMainData.WIDTH / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.PinMainData.HEIGHT / 2);
  };

  var activatePageByMouse = function () {
    window.util.map.classList.remove('map--faded');
    window.form.activateForm();
    window.server.load(drawPins, window.modal.showErrorModal);
    window.form.advertForm.addEventListener('submit', window.form.formSubmitHandler);
    pinMain.removeEventListener('mousedown', activatePageByMouse);
  };

  var activatePageByEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activatePageByMouse();
      pinMain.removeEventListener('keydown', activatePageByEnter);
    }
  };

  var deactivatePage = function () {
    window.util.map.classList.add('map--faded');
    window.form.deactivateForm();
    respawnPin();
    window.form.advertForm.removeEventListener('submit', window.form.formSubmitHandler);
    window.map.pinMain.addEventListener('mousedown', activatePageByMouse);
    window.map.pinMain.addEventListener('keydown', activatePageByEnter);
  };

  pinMain.addEventListener('mousedown', activatePageByMouse);
  pinMain.addEventListener('keydown', activatePageByEnter);

  window.map = {
    pinMain: pinMain,
    deactivatePage: deactivatePage,
    drawPins: drawPins,
    PinData: PinData,
    PinMainData: PinMainData,
    respawnPin: respawnPin,
    deletePins: deletePins
  };

  window.dragndrop(pinMain, window.util.map);
})();
