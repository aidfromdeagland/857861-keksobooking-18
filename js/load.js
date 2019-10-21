'use strict';

(function () {
  var URL = 'https://js.dump.academy/keksobooking/data';
  var TIMEOUT = 5000;
  var STATUS_SUCCESS = 200;


  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        window.loadedData = xhr.response;
        onSuccess(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + '.');
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Время ожидания ответа (' + TIMEOUT / 1000 + ' секунд) истекло.');
    });

    xhr.timeout = TIMEOUT;

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения ' + xhr.status + '.');
    });

    xhr.open('GET', URL);
    xhr.send();
  };
})();
