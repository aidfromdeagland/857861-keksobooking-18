'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var apartments = window.data.apartments;

  var renderPin = function (index) {
    var clonedPin = pinTemplate.cloneNode(true);
    clonedPin.style = 'left: ' + (apartments[index].location.x - PIN_WIDTH / 2) +
    'px; top: ' + (apartments[index].location.y - PIN_HEIGHT) + 'px;';
    clonedPin.firstElementChild.src = apartments[index].author.avatar;
    clonedPin.firstElementChild.alt = apartments[index].offer.description;
    return clonedPin;
  };

  var drawPins = function (pinsQuantity) {
    for (var i = 0; i < pinsQuantity; i++) {
      fragmentPins.appendChild(renderPin(i));
    }
    pinsArea.appendChild(fragmentPins);
  };

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var pinsArea = document.querySelector('.map__pins');
  var fragmentPins = document.createDocumentFragment();

  window.map = {
    drawPins: drawPins
  };
})();
