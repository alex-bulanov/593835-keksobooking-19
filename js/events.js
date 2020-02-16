'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var adData;

  var housinTypeElement = document.getElementById('housing-type');

  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var onPinLeftMouseClick = function (evt) {
    var currentPin = evt.currentTarget;
    var currentIndex = currentPin.dataset.index;
    var currentPinObject = adData[currentIndex];
    var currentCard = window.card.getAdCardElement(currentPinObject);
    var oldCard = document.querySelector('.map__card');

    if (document.contains(oldCard)) {
      oldCard.remove();
    }

    window.show.showCard(currentCard);
  };

  var onLoad = function (data) {
    adData = data;

    adData.forEach(function (item, i) {
      item.curentObjIndex = i;
    });

    window.show.showPins(adData);

    housinTypeElement.addEventListener('change', onHousinTypeChange);

  };

  var onCheckCondition = function (status) {
    if (status !== 200) {
      window.show.showError();

    } else {
      window.show.showSuccess();
      window.util.pageReset();
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

  var onErrorEscPress = function (evt) {
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

  var onHousinTypeChange = function () {
    var housingType = housinTypeElement.value;

    if (housingType === 'any') {
      window.show.showPins(adData);
    } else {
      var sameHousingType = adData.filter(function (it) {
        return it.offer.type === housingType;
      });
      window.show.showPins(sameHousingType);
    }
  };

  window.events = {
    onCheckCondition: onCheckCondition,
    onErrorButtonMouseClick: onErrorButtonMouseClick,
    onErrorEcsPress: onErrorEscPress,
    onSuccessEcsPress: onSuccessEcsPress,
    onErrorElementClick: onErrorElementClick,
    onSuccessElementClick: onSuccessElementClick,
    onMainPinLeftMouseClick: onMainPinLeftMouseClick,
    onPinLeftMouseClick: onPinLeftMouseClick,
  };
})();
