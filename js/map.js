'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');

  var renderPins = function (objects) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(objects[i]);
      mapPins.appendChild(fragment);
    }

    // Вешаем слушатель.

    var adPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adPins.length; j++) {
      adPins[j].addEventListener('click', onPinLeftMouseClick);
    }
  };

  var renderCard = function (element) {
    var map = document.querySelector('.map');
    var mapFilterContainer = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    map.insertBefore(fragment, mapFilterContainer);
  };

  var onLoad = function (data) {
    // console.log(data);
  };

  var onError = function (message) {
    // console.log(message);
  };

  var onPinLeftMouseClick = function (evt) {
    var currentPin = evt.currentTarget;
    var currentIndex = currentPin.dataset.index;
    var currentPinObject = window.pin.getAdObject([currentIndex]);
    var currentCard = window.card.getAdCardElement(currentPinObject);
    var oldCard = document.querySelector('.map__card');
    if (document.contains(oldCard)) {
      oldCard.remove();
    }
    renderCard(currentCard);
  };

  var onMainPinLeftMouseClick = function (evt) {
    var map = document.querySelector('.map');

    if (evt.which === 1) {
      map.classList.remove('map--faded');

      // Получаем данные с сервера.

      window.backend.load(onLoad, onError);

      // Активируем форму.
      window.form.setActiveFormCondition();
      window.form.adForm.addEventListener('change', window.form.onFormChange);

      var AdObjects = window.pin.getAdObjects();
      var pinsForRend = window.pin.getPins(AdObjects);

      // Отображаем пины.
      renderPins(pinsForRend);
      pinMain.removeEventListener('click', onMainPinLeftMouseClick);

    }
  };

  window.form.setDisabledFormCondition();
  pinMain.addEventListener('mousedown', window.drag.onMainPinMouseDown);
  pinMain.addEventListener('click', onMainPinLeftMouseClick);

})();
