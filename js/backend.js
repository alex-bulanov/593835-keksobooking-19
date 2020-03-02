'use strict';

(function () {
  var load = function (onSuccess, onError) {

    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error = '';
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    xhr.timeout = 5000;
    xhr.open('GET', URL, true);

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  };

  var save = function (formDate, onCheckCondition) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    var URL = 'https://js.dump.academy/keksobooking';

    xhr.addEventListener('load', function () {
      var error = '';

      switch (xhr.status) {
        case 200:
          onCheckCondition(xhr.status);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText;
      }

      if (error) {
        onCheckCondition(xhr.status);
      }
    });

    xhr.open('POST', URL);
    xhr.send(formDate);
  };

  window.backend = {
    load: load,
    save: save
  };
})();
