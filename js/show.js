'use strict';

(function () {

  var showError = function () {
    var main = document.querySelector('main');
    var errorTemplate = document.getElementById('error').content.querySelector('.error');
    var errorElement = errorTemplate.cloneNode(true);
    var errorButtonClose = errorElement.querySelector('.error__button');

    errorButtonClose.addEventListener('click', window.events.onErrorButtonMouseClick);
    document.addEventListener('keydown', window.events.onErrorEcsPress);
    errorElement.addEventListener('click', window.events.onErrorElementClick);
    main.appendChild(errorElement);
  };

  var showSuccess = function () {
    var main = document.querySelector('main');
    var successTemplate = document.getElementById('success').content.querySelector('.success');
    var successElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', window.events.onSuccessEcsPress);
    successElement.addEventListener('click', window.events.onSuccessElementClick);
    main.appendChild(successElement);
  };

  var showCard = function (element) {
    var map = document.querySelector('.map');
    var mapFilterContainer = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    map.insertBefore(fragment, mapFilterContainer);
  };

  var showPins = function (objects) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(objects[i]);
      mapPins.appendChild(fragment);
    }
    // Вешаем слушатель.
    var adPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adPins.length; j++) {
      adPins[j].addEventListener('click', window.events.onPinLeftMouseClick);
    }
  };

  window.show = {
    showPins: showPins,
    showCard: showCard,
    showError: showError,
    showSuccess: showSuccess
  };
})();
