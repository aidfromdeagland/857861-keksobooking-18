'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');

  var debounce = function (callback, delay) {
    var timer = null;

    return function () {
      var args = arguments;

      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(function () {
        callback(null, args);
      }, delay);
    };
  };

  window.util = {
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE,
    map: map,
    debounce: debounce
  };
})();

