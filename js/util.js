'use strict';

(function () {
  var ENTER_KEYCODE = 13;
  var ESC_KEYCODE = 27;
  var map = document.querySelector('.map');

  var getNounForms = function (number, options) {

    if (number >= 11 && number <= 14) {
      return options[2];
    } else {
      var stringedValue = number + '';
      var lastChar = stringedValue.charAt(stringedValue.length - 1);

      if (+lastChar === 1) {
        return options[0];
      }

      if (+lastChar >= 2 && +lastChar <= 4) {
        return options[1];
      }

      return options[2];
    }
  };

  window.util = {
    map: map,
    getNounForms: getNounForms,
    ENTER_KEYCODE: ENTER_KEYCODE,
    ESC_KEYCODE: ESC_KEYCODE
  };
})();

