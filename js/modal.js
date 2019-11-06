'use strict';

(function () {
  var mainNode = document.querySelector('main');

  var showErrorModal = function (errorText) {
    var templateError = document.querySelector('#error').content.querySelector('.error');
    var clonedError = templateError.cloneNode(true);
    var errorButton = clonedError.querySelector('.error__button');
    var fragmentError = document.createDocumentFragment();
    clonedError.firstElementChild.textContent = errorText;
    fragmentError.appendChild(clonedError);

    var annihilateErrorModal = function () {
      errorButton.removeEventListener('mousedown', errorButtonMousedownHandler);
      clonedError.removeEventListener('click', errorClickHandler);
      document.removeEventListener('keydown', errorKeydownHandler);
      clonedError.remove();
    };

    var errorButtonMousedownHandler = function () {
      annihilateErrorModal();
    };

    var errorClickHandler = function (evt) {
      if (evt.target !== clonedError.querySelector('.error__message')) {
        annihilateErrorModal();
      }
    };

    var errorKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        annihilateErrorModal();
      }
    };

    errorButton.addEventListener('mousedown', errorButtonMousedownHandler);
    clonedError.addEventListener('click', errorClickHandler);
    document.addEventListener('keydown', errorKeydownHandler);
    mainNode.appendChild(fragmentError);
  };

  var showSuccessModal = function () {

    var templateSuccess = document.querySelector('#success').content.querySelector('.success');
    var clonedSuccess = templateSuccess.cloneNode(true);
    var fragmentSuccess = document.createDocumentFragment();
    fragmentSuccess.appendChild(clonedSuccess);

    var removeSuccessModal = function () {
      clonedSuccess.removeEventListener('click', successClickHandler);
      document.removeEventListener('keydown', successKeydownHandler);
      clonedSuccess.remove();
    };

    var successClickHandler = function (evt) {
      if (evt.target !== clonedSuccess.querySelector('.success__message')) {
        removeSuccessModal();
      }
    };

    var successKeydownHandler = function (evt) {
      if (evt.keyCode === window.util.ESC_KEYCODE) {
        removeSuccessModal();
      }
    };

    clonedSuccess.addEventListener('click', successClickHandler);
    document.addEventListener('keydown', successKeydownHandler);
    mainNode.appendChild(fragmentSuccess);
    window.map.deactivatePage();
  };

  window.modal = {
    showErrorModal: showErrorModal,
    showSuccessModal: showSuccessModal
  };

})();
