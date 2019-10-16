'use strict';

(function () {
  window.showErrorModal = function (errorText) {
    var mainNode = document.querySelector('main');
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var clonedError = templateError.cloneNode(true);
    var fragmentError = document.createDocumentFragment();
    clonedError.firstElementChild.textContent = errorText;
    fragmentError.appendChild(clonedError);
    var errorButton = fragmentError.querySelector('.error').querySelector('.error__button');


    var onErrorButtonClick = function () {
      errorButton.parentElement.hidden = true;
      window.load(window.Map.drawPins, window.showErrorModal);
      errorButton.removeEventListener('click', onErrorButtonClick);
    };

    var onEscErrorClick = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        onErrorButtonClick();
        document.removeEventListener('keydown', onEscErrorClick);
      }
    };

    errorButton.addEventListener('click', onErrorButtonClick);
    document.addEventListener('keydown', onEscErrorClick);
    mainNode.appendChild(fragmentError);
  };

})();
