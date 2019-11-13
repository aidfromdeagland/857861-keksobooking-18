'use strict';

(function () {
  var ServerUrl = {
    LOAD: 'https://js.dump.academy/keksobooking/data',
    UPLOAD: 'https://js.dump.academy/keksobooking'
  };
  var TIMEOUT = 5000;
  var STATUS_SUCCESS = 200;

  var createXhr = function (method, url, data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    if (method === 'GET') {
      xhr.responseType = 'json';
    }

    xhr.addEventListener('load', function () {
      if (xhr.status === STATUS_SUCCESS) {
        window.loadedData = xhr.response;
        window.form.disable(window.form.mapFilters, false);
        onSuccess(xhr.response);
      } else {
        onError('Ошибка: ' + xhr.status + '.');
      }
    });

    xhr.addEventListener('timeout', function () {
      onError('Время ожидания ответа (' + TIMEOUT / 1000 + ' секунд) истекло.');
    });

    xhr.addEventListener('error', function () {
      onError('Ошибка соединения ' + xhr.status + '.');
    });

    xhr.open(method, url);
    xhr.timeout = TIMEOUT;
    xhr.send(data || null);
  };

  var load = function (onSuccess, onError) {
    createXhr('GET', ServerUrl.LOAD, '', onSuccess, onError);
  };

  var upload = function (data, onSuccess, onError) {
    createXhr('POST', ServerUrl.UPLOAD, data, onSuccess, onError);
  };

  window.server = {
    load: load,
    upload: upload
  };

})();
