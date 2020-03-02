'use strict';

(function () {

  var MAX_PIN_QUANTITY = 5;
  var main = document.querySelector('main');
  var errorTemplate = document.getElementById('error').content.querySelector('.error');
  var successTemplate = document.getElementById('success').content.querySelector('.success');
  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins');

  var showError = function () {
    var errorElement = errorTemplate.cloneNode(true);
    var errorButtonClose = errorElement.querySelector('.error__button');

    errorButtonClose.addEventListener('click', window.events.onErrorButtonMouseClick);
    document.addEventListener('keydown', window.events.onErrorEscPress);
    errorElement.addEventListener('click', window.events.onErrorElementClick);
    main.appendChild(errorElement);
  };

  var showSuccess = function () {
    var successElement = successTemplate.cloneNode(true);
    document.addEventListener('keydown', window.events.onSuccessEscPress);
    successElement.addEventListener('click', window.events.onSuccessElementClick);
    main.appendChild(successElement);
  };

  var showCard = function (element) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    map.insertBefore(fragment, mapFilterContainer);

    document.addEventListener('keydown', window.events.onCardEscPress);
  };

  var showPins = function (data) {
    var pinsForDrawing = window.pins.create(data);
    var fragment = document.createDocumentFragment();

    for (var i = 0; (i < MAX_PIN_QUANTITY && i < data.length); i++) {
      fragment.appendChild(pinsForDrawing[i]);
      mapPins.appendChild(fragment);
    }
  };

  window.show = {
    showPins: showPins,
    showCard: showCard,
    showError: showError,
    showSuccess: showSuccess
  };
})();
