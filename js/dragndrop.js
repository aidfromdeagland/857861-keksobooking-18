'use strict';

(function () {
  window.dragndrop = function (element, borderElement) {
    var elementMinX = borderElement.clientLeft - window.map.PIN_MAIN_WIDTH / 2;
    var elementMinY = 130 - window.map.PIN_MAIN_HEIGHT;
    var elementMaxX = borderElement.clientWidth - window.map.PIN_MAIN_WIDTH / 2;
    var elementMaxY = 630 - window.map.PIN_MAIN_HEIGHT;

    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var coordsStart = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var coordsDelta = {
          x: coordsStart.x - moveEvt.clientX,
          y: coordsStart.y - moveEvt.clientY,
        };

        coordsStart = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var elementCurrentX = element.offsetLeft - coordsDelta.x;
        var elementCurrentY = element.offsetTop - coordsDelta.y;

        var setPinCoord = function (value, min, max) {
          if (value < max && value > min) {
            return value;
          } else {
            if (value >= max) {
              return max;
            } else {
              return min;
            }
          }
        };

        element.style.left = setPinCoord(elementCurrentX, elementMinX, elementMaxX) + 'px';
        element.style.top = setPinCoord(elementCurrentY, elementMinY, elementMaxY) + 'px';
        window.form.advertAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.PIN_MAIN_WIDTH / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.PIN_MAIN_HEIGHT);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });
  };

})();
