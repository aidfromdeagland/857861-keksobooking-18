'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinMain = document.querySelector('.map__pin--main');
  var PIN_MAIN_TAIL_HEIGHT = 20;
  var PIN_MAIN_WIDTH = pinMain.offsetWidth;
  var PIN_MAIN_HEIGHT = pinMain.offsetHeight + PIN_MAIN_TAIL_HEIGHT;
  var PIN_MAIN_DEFAULT_X = pinMain.offsetLeft;
  var PIN_MAIN_DEFAULT_Y = pinMain.offsetTop;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsArea = document.querySelector('.map__pins');


  var renderPin = function (index, adArray) {
    var clonedPin = pinTemplate.cloneNode(true);
    clonedPin.style = 'left: ' + (adArray[index].location.x - PIN_WIDTH / 2) +
    'px; top: ' + (adArray[index].location.y - PIN_HEIGHT) + 'px;';
    clonedPin.firstElementChild.src = adArray[index].author.avatar;
    clonedPin.firstElementChild.alt = adArray[index].offer.description;
    return clonedPin;
  };

  var drawPins = function (adList) {
    var fragmentPins = document.createDocumentFragment();

    for (var i = 0; i < adList.length; i++) {
      fragmentPins.appendChild(renderPin(i, adList));
    }
    pinsArea.appendChild(fragmentPins);
  };

  var activatePageByMouse = function () {
    window.util.map.classList.remove('map--faded');
    window.form.advertForm.classList.remove('ad-form--disabled');
    window.form.setFormActivity('activate');
    window.load(drawPins, window.showErrorModal);
    pinMain.removeEventListener('mousedown', activatePageByMouse);
  };

  var activatePageByEnter = function (evt) {
    if (evt.keyCode === window.util.ENTER_KEYCODE) {
      activatePageByMouse();
      pinMain.removeEventListener('keydown', activatePageByEnter);
    }
  };

  var deactivatePage = function () {
    // cancel eventListeners for mousemove, mouseup
    window.util.map.classList.add('map--faded');
    window.form.advertForm.classList.add('ad-form--disabled');
    window.form.setFormActivity('deactivate');
    pinMain.addEventListener('mousedown', activatePageByMouse);
    pinMain.addEventListener('keydown', activatePageByEnter);
    pinMain.style.left = (PIN_MAIN_DEFAULT_X) + 'px';
    pinMain.style.top = (PIN_MAIN_DEFAULT_Y) + 'px';
    window.form.advertAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.PIN_MAIN_WIDTH / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.PIN_MAIN_HEIGHT);
  };

  pinMain.addEventListener('mousedown', activatePageByMouse);
  pinMain.addEventListener('keydown', activatePageByEnter);

  window.map = {
    pinMain: pinMain,
    deactivatePage: deactivatePage,
    drawPins: drawPins,
    PIN_MAIN_TAIL_HEIGHT: PIN_MAIN_TAIL_HEIGHT,
    PIN_MAIN_WIDTH: PIN_MAIN_WIDTH,
    PIN_MAIN_HEIGHT: PIN_MAIN_HEIGHT
  };

  window.dragndrop(pinMain, window.util.map);
})();
