'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var mapPins = document.querySelector('.map__pins');

  var onLoad = function (data) {
    var pinsForDrawing = window.pin.getPins(data);

    var onPinLeftMouseClick = function (evt) {
      var currentPin = evt.currentTarget;
      var currentIndex = currentPin.dataset.index;

      var currentPinObject = data[currentIndex];
      var currentCard = window.card.getAdCardElement(currentPinObject);
      var oldCard = document.querySelector('.map__card');
      if (document.contains(oldCard)) {
        oldCard.remove();
      }

      window.show.showCard(currentCard);
    };

    var onLoadShowPins = function (objects) {
      // var mapPins = document.querySelector('.map__pins');
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

    onLoadShowPins(pinsForDrawing);
  };

  var onCheckCondition = function (status) {
    if (status !== 200) {
      window.show.showError();

    } else {
      window.show.showSuccess();
      onPageReset();
    }
  };

  var onError = function () {
    window.show.showError();
  };

  var onErrorButtonMouseClick = function () {
    var errorMessage = document.querySelector('.error__button');
    errorMessage.remove();
    window.backend.load(onLoad, onError);
  };

  var onErrorEcsPress = function (evt) {
    var errorMessage = document.querySelector('.error');
    if (evt.keyCode === ESC_KEYCODE) {
      errorMessage.remove();
      errorMessage.removeEventListener('click', window.events.onErrorElementClick);
      document.removeEventListener('keydown', window.events.onErrorEcsPress);
    }
  };

  var onSuccessEcsPress = function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.keyCode === ESC_KEYCODE) {
      successMessage.remove();
      document.removeEventListener('keydown', window.events.onSuccessEcsPress);
      successMessage.removeEventListener('click', window.events.onErrorElementClick);
    }
  };


  var onErrorElementClick = function () {
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
    errorMessage.removeEventListener('click', window.events.onErrorElementClick);
    document.removeEventListener('keydown', window.events.onErrorEcsPress);
  };

  var onSuccessElementClick = function () {
    var successMessage = document.querySelector('.success');
    successMessage.remove();
    successMessage.removeEventListener('click', window.events.onErrorElementClick);
    document.removeEventListener('keydown', window.events.onSuccessEcsPress);
  };

  var onMainPinLeftMouseClick = function (evt) {
    if (evt.which === 1) {
      map.classList.remove('map--faded');

      // Получаем данные с сервера.
      window.backend.load(onLoad, onError);

      // Активируем форму.
      window.form.setActiveFormCondition();
      window.form.adForm.addEventListener('change', window.form.onFormChange);

      pinMain.removeEventListener('click', onMainPinLeftMouseClick);

    }
  };

  var onPageReset = function () {
    window.form.setDisabledFormCondition();
    var adForm = document.querySelector('.ad-form');
    adForm.reset();
    adForm.classList.add('ad-form--disabled');

    var popup = document.querySelector('.popup');

    if (popup !== null) {
      popup.remove();
    }

    var adPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adPins.length; j++) {
      adPins[j].remove();
    }

    map.classList.add('map--faded');

    pinMain.addEventListener('mousedown', window.drag.onMainPinMouseDown);
    pinMain.addEventListener('click', window.events.onMainPinLeftMouseClick);

  };

  window.events = {
    onPageReset: onPageReset,
    onCheckCondition: onCheckCondition,
    onErrorButtonMouseClick: onErrorButtonMouseClick,
    onErrorEcsPress: onErrorEcsPress,
    onSuccessEcsPress: onSuccessEcsPress,
    onErrorElementClick: onErrorElementClick,
    onSuccessElementClick: onSuccessElementClick,
    onMainPinLeftMouseClick: onMainPinLeftMouseClick,
  };
})();
