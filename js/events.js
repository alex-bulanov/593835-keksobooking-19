'use strict';

(function () {

  var ESC_KEYCODE = 27;
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var adData;

  var onPinLeftMouseClick = function (evt) {
    var currentPin = evt.currentTarget;
    var currentIndex = currentPin.dataset.index;
    var currentPinObject = adData[currentIndex];
    var currentCard = window.card.createAdCardElement(currentPinObject);
    var popup = document.querySelector('.popup');

    if (popup) {
      var cardClose = popup.querySelector('.popup__close');
      cardClose.removeEventListener('keydown', window.events.onCloseButtonCard);
      document.removeEventListener('keydown', window.events.onEscPressCard);
      popup.remove();
    }

    window.show.showCard(currentCard);
  };

  var onLoad = function (data) {
    adData = data;

    adData.forEach(function (item, i) {
      item.currentObjIndex = i;
    });

    window.pins.remove();
    window.show.showPins(adData);
    window.filter.mapFilter.addEventListener('change', onFilterFieldsChange);
  };

  var onCardEscPress = function (evt) {
    var popup = document.querySelector('.popup');
    var cardClose = popup.querySelector('.popup__close');
    if (evt.key === window.util.ESC_KEY) {
      popup.remove();
    }
    cardClose.removeEventListener('keydown', onCardCloseButton);
    document.removeEventListener('keydown', onCardEscPress);
  };

  var onCardCloseButton = function () {
    var popup = document.querySelector('.popup');
    var cardClose = popup.querySelector('.popup__close');
    popup.remove();
    cardClose.removeEventListener('keydown', onCardCloseButton);
    document.removeEventListener('keydown', onCardEscPress);
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
      document.removeEventListener('keydown', window.events.onErrorEscPress);
    }
  };

  var onSuccessEscPress = function (evt) {
    var successMessage = document.querySelector('.success');
    if (evt.keyCode === ESC_KEYCODE) {
      successMessage.remove();
      document.removeEventListener('keydown', window.events.onSuccessEscPress);
      successMessage.removeEventListener('click', window.events.onErrorElementClick);
    }
  };

  var onErrorElementClick = function () {
    var errorMessage = document.querySelector('.error');
    errorMessage.remove();
    errorMessage.removeEventListener('click', window.events.onErrorElementClick);
    document.removeEventListener('keydown', window.events.onErrorEscPress);
  };

  var onSuccessElementClick = function () {
    var successMessage = document.querySelector('.success');
    successMessage.remove();
    successMessage.removeEventListener('click', window.events.onErrorElementClick);
    document.removeEventListener('keydown', window.events.onSuccessEscPress);
  };

  var onMainPinLeftMouseClick = function (evt) {
    var pinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');

    if (evt.which === 1) {
      map.classList.remove('map--faded');

      window.backend.load(onLoad, onError);
      window.form.setActiveFormCondition();
      window.form.adForm.addEventListener('change', onFormChange);
      window.form.adReset.addEventListener('click', onFormReset);

      pinMain.removeEventListener('click', onMainPinLeftMouseClick);
    }
  };

  var onFilterFieldsChange = function () {
    var popup = document.querySelector('.popup');

    if (popup) {
      var cardClose = popup.querySelector('.popup__close');
      cardClose.removeEventListener('keydown', window.events.onCloseButtonCard);
      document.removeEventListener('keydown', window.events.onEscPressCard);
      popup.remove();
    }

    var filteredData = window.filter.getFilteredData(adData);
    window.pins.remove();

    if (filteredData.length > 0) {
      window.debounce(window.show.showPins(filteredData));
    }
  };

  var onFormChange = function () {
    var adTitleField = document.querySelector('#title');
    var adHousingTypeField = document.querySelector('#type');
    var adPriceField = document.querySelector('#price');
    var adRoomQuantityField = document.querySelector('#room_number');
    var adGuestsQuantityField = document.querySelector('#capacity');
    var adTimeInField = document.querySelector('#timein');
    var adTimeOutField = document.querySelector('#timeout');

    adTitleField.addEventListener('input', onInputTitleValidity);
    adHousingTypeField.addEventListener('change', onChangesHousingType);
    adPriceField.addEventListener('input', onInputPriceValidity);
    adRoomQuantityField.addEventListener('change', onChangesGuestsQuantity);
    adGuestsQuantityField.addEventListener('change', onChangesGuestsQuantity);
    adTimeInField.addEventListener('change', onChangesTime);
    adTimeOutField.addEventListener('change', onChangesTime);
  };

  var onInputTitleValidity = function () {
    window.form.checkInputTitleValidity();
  };

  var onChangesHousingType = function () {
    window.form.checkHousingType();
  };

  var onInputPriceValidity = function () {
    window.form.checkInputPriceValidity();
  };

  var onChangesGuestsQuantity = function () {
    window.form.checkRoomGuestsValidity();
  };

  var onChangesTime = function () {
    window.form.setTimeFieldValue();
  };

  var onFormReset = function () {
    window.util.pageReset();
    window.form.adReset.removeEventListener('click', onFormReset);
  };

  var onFileChooserAvatar = function () {
    var file = window.photo.fileChooserAvatar.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        window.photo.preview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  };


  var onFileChooserImages = function () {
    var file = window.photo.fileChooserImages.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      var fragment = document.createDocumentFragment();
      var element = document.createElement('IMG');
      element.style.width = '70px';
      element.style.height = '70px';
      element.alt = 'Фотография жилья';
      fragment.appendChild(element);

      reader.addEventListener('load', function () {
        element.src = reader.result;
      });

      reader.readAsDataURL(file);
    }

    window.photo.adPhoto.appendChild(fragment);
  };

  window.events = {
    onCardEscPress: onCardEscPress,
    onCardCloseButton: onCardCloseButton,
    onCheckCondition: onCheckCondition,
    onErrorButtonMouseClick: onErrorButtonMouseClick,
    onErrorEscPress: onErrorEscPress,
    onSuccessEscPress: onSuccessEscPress,
    onErrorElementClick: onErrorElementClick,
    onSuccessElementClick: onSuccessElementClick,
    onMainPinLeftMouseClick: onMainPinLeftMouseClick,
    onPinLeftMouseClick: onPinLeftMouseClick,
    onFormChange: onFormChange,
    onFileChooserAvatar: onFileChooserAvatar,
    onFileChooserImages: onFileChooserImages
  };
})();
