'use strict';

(function () {

  var ESC_KEYCODE = 27;

  var adData;
  var filteredData;

  var housingTypeElement = document.getElementById('housing-type');
  var housingPriceElement = document.getElementById('housing-price');
  var housingRoomsElement = document.getElementById('housing-rooms');
  var housingGuestsElement = document.getElementById('housing-guests');
  var housingWifiElement = document.getElementById('filter-wifi');
  var housingDishwasherElement = document.getElementById('filter-dishwasher');
  var housingParkingElement = document.getElementById('filter-parking');
  var housingWasherElement = document.getElementById('filter-washer');
  var housingElevatorElement = document.getElementById('filter-elevator');
  var housingConditionerElement = document.getElementById('filter-conditioner');

  var pinMain = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');

  var onPinLeftMouseClick = function (evt) {
    var currentPin = evt.currentTarget;
    var currentIndex = currentPin.dataset.index;
    var currentPinObject = adData[currentIndex];
    var currentCard = window.card.getAdCardElement(currentPinObject);

    window.card.removeAdCardElement();
    window.show.showCard(currentCard);
  };

  var onLoad = function (data) {
    adData = data;

    adData.forEach(function (item, i) {
      item.currentObjIndex = i;
    });

    window.pin.removePins();
    window.show.showPins(adData);

    housingTypeElement.addEventListener('change', onFilterFieldsChange);
    housingPriceElement.addEventListener('change', onFilterFieldsChange);
    housingRoomsElement.addEventListener('change', onFilterFieldsChange);
    housingGuestsElement.addEventListener('change', onFilterFieldsChange);
    housingWifiElement.addEventListener('change', onFilterFieldsChange);
    housingDishwasherElement.addEventListener('change', onFilterFieldsChange);
    housingParkingElement.addEventListener('change', onFilterFieldsChange);
    housingWasherElement.addEventListener('change', onFilterFieldsChange);
    housingElevatorElement.addEventListener('change', onFilterFieldsChange);
    housingConditionerElement.addEventListener('change', onFilterFieldsChange);
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

  var onFilterFieldsChange = function () {
    window.card.removeAdCardElement();
    filteredData = window.filter.getFilteredData(adData);
    window.pin.removePins();
    if (filteredData.length > 0) {
      window.debounce(window.show.showPins(filteredData));
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
