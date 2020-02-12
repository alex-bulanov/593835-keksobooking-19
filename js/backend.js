'use strict';

(function () {
  var onLoad = function (data) {
    console.log(data);
  };

  var onError = function (message) {
    console.log(message);
  };

  var load = function (onSuc, onErr) {

    var xhr = new XMLHttpRequest();
    var URL = 'https://js.dump.academy/keksobooking/data';
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      var error = '';
      switch (xhr.status) {
        case 200:
          onSuc(xhr.response);
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
        onErr(error);
      }
    });

    xhr.timeout = 1000;
    xhr.open('GET', URL, true);

    xhr.addEventListener('timeout', function () {
      window.render.renderError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.send();
  };

  window.backend = {
    load: load,
    onLoad: onLoad,
    onError: onError
  };
})();
