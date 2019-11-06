'use strict';

(function () {
  var TOP_Y_LIMIT = 130;
  var BOTTOM_Y_LIMIT = 630;

  window.dragndrop = function (element, borderElement) {
    var elementMinX = borderElement.clientLeft - window.map.PinMainData.WIDTH / 2;
    var elementMinY = TOP_Y_LIMIT - window.map.PinMainData.HEIGHT - window.map.PinMainData.TAIL_HEIGHT;
    var elementMaxX = borderElement.clientWidth - window.map.PinMainData.WIDTH / 2;
    var elementMaxY = BOTTOM_Y_LIMIT - window.map.PinMainData.HEIGHT - window.map.PinMainData.TAIL_HEIGHT;

    element.addEventListener('mousedown', function (evt) {
      evt.preventDefault();

      var CoordsStart = {
        x: evt.clientX,
        y: evt.clientY
      };

      var mouseMoveHandler = function (moveEvt) {
        moveEvt.preventDefault();

        var CoordsDelta = {
          x: CoordsStart.x - moveEvt.clientX,
          y: CoordsStart.y - moveEvt.clientY,
        };

        CoordsStart = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var elementCurrentX = element.offsetLeft - CoordsDelta.x;
        var elementCurrentY = element.offsetTop - CoordsDelta.y;

        var setPinCoord = function (value, min, max) {
          if (value < max && value > min) {
            return value;
          }

          if (value >= max) {
            return max;
          }

          return min;
        };

        element.style.left = setPinCoord(elementCurrentX, elementMinX, elementMaxX) + 'px';
        element.style.top = setPinCoord(elementCurrentY, elementMinY, elementMaxY) + 'px';
        window.form.advertAddress.value = Math.round(window.map.pinMain.offsetLeft + window.map.PinMainData.WIDTH / 2) + ', ' + Math.round(window.map.pinMain.offsetTop + window.map.PinMainData.HEIGHT + window.map.PinMainData.TAIL_HEIGHT);
      };

      var mouseUpHandler = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
      };

      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    });
  };

})();
