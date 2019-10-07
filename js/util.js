'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  // var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');

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

  window.util = {
    map: map,
    getRandomIntInclusive: getRandomIntInclusive,
    getRandomArray: getRandomArray,
    ENTER_KEYCODE: ENTER_KEYCODE
  };
})();
