'use strict';

(function () {

  var MAX_PIN_QUANTITY = 5;

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

  var showPins = function (data) {
    var mapPins = document.querySelector('.map__pins');
    var popup = document.querySelector('.popup');

    var adPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adPins.length; j++) {
      adPins[j].remove();
    }

    if (popup !== null) {
      popup.remove();
    }

    if (data.length > 0) {
      var dataIndex = data.length;
      var pinsForDrawing = window.pin.getPins(data);
      var fragment = document.createDocumentFragment();

      for (var i = 0; (i < MAX_PIN_QUANTITY && dataIndex); i++) {
        fragment.appendChild(pinsForDrawing[i]);
        mapPins.appendChild(fragment);
        dataIndex--;
      }
    }
  };

  window.show = {
    showPins: showPins,
    showCard: showCard,
    showError: showError,
    showSuccess: showSuccess
  };
})();
