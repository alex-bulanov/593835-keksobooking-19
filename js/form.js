'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var formSelects = adForm.querySelectorAll('select');
  var formInputs = adForm.querySelectorAll('input');
  var formButtons = adForm.querySelectorAll('button');
  var adAvatar = document.getElementById('avatar');
  var adTitleField = document.getElementById('title');
  var adAddressField = document.getElementById('address');
  var adHousingTypeField = document.getElementById('type');
  var adPriceField = document.getElementById('price');
  var adRoomQuantityField = document.getElementById('room_number');
  var adGuestsQuantityField = document.getElementById('capacity');
  var adTimeInField = document.getElementById('timein');
  var adTimeOutField = document.getElementById('timeout');
  var adImg = document.getElementById('images');

  var getMinPriceValue = function () {
    var minPriceValue = window.data.apartmentPriceByKey[adHousingTypeField.value];
    return minPriceValue;
  };

  var checkAndSetInputAddress = function () {

    adAddressField.setAttribute('readonly', 'readonly');

    // Проверяем состояние формы и присваеваем значение полю адреса.
    var pinMain = document.querySelector('.map__pin--main');
    var pinMainStyle = getComputedStyle(pinMain);
    var pinWidth = parseInt(pinMainStyle.width, 10);
    var pinHeight = parseInt(pinMainStyle.height, 10);
    var pinLeftСoordinate = parseInt(pinMainStyle.left, 10);
    var pinTopСoordinate = parseInt(pinMainStyle.top, 10);
    var addressСoordinateX = Math.floor(pinLeftСoordinate + pinWidth / 2);
    var addressСoordinateY = 0;
    if (adForm.classList.contains('ad-form--disabled')) {
      addressСoordinateY = Math.floor(pinTopСoordinate + pinHeight / 2);
    } else {
      addressСoordinateY = Math.floor(pinTopСoordinate + pinHeight + 22);
    }
    var adAddressValue = addressСoordinateX + ', ' + addressСoordinateY;
    adAddressField.value = adAddressValue;
  };

  var checkInputPriceValidity = function () {
    var priceField = adPriceField;

    if (priceField.value < getMinPriceValue() || priceField.value > window.data.MAX_PRICE_VALUE) {
      priceField.setCustomValidity('Цена не может быть ниже ' +
        getMinPriceValue() + ' и выше чем ' + window.data.MAX_PRICE_VALUE + '.');
    } else {
      priceField.setCustomValidity('');
    }
  };

  var checkRoomGuestsValidity = function () {
    var target = adGuestsQuantityField;
    var guests = parseInt(target.value, 10);

    switch (adRoomQuantityField.value) {
      case '1':
        if (guests > 1 || guests === 0) {
          target.setCustomValidity('Гостей должно быть не больше одного.');
        } else {
          target.setCustomValidity('');
        }
        break;
      case '2':
        if (guests > 2 || guests === 0) {
          target.setCustomValidity('Гостей должно быть не больше двух.');
        } else {
          target.setCustomValidity('');
        }
        break;
      case '3':
        if (guests > 3 || guests === 0) {
          target.setCustomValidity('Гостей должно быть не больше трех.');
        } else {
          target.setCustomValidity('');
        }
        break;
      case '100':
        if (guests !== 0) {
          target.setCustomValidity('Подходит только для "не гостей"');
        } else {
          target.setCustomValidity('');
        }
        break;

      default:
        target.setCustomValidity('');
    }
  };

  var checkInputTitleValidity = function () {
    var target = adTitleField;
    if (target.value.length < window.data.MIN_TITLE_LENGTH || target.value.length > window.data.MAX_TITLE_LENGTH) {
      target.setCustomValidity('Имя должно состоять минимум из ' +
        window.data.MIN_TITLE_LENGTH +
          ' и максимум из ' + window.data.MAX_TITLE_LENGTH + ' символов.');

    } else {
      target.setCustomValidity('');
    }
  };

  var checkHousingType = function () {
    checkInputPriceValidity();
    adPriceField.placeholder = window.data.apartmentPriceByKey[adHousingTypeField.value];
    adPriceField.setAttribute('required', 'required');
    adPriceField.setAttribute('min', window.data.apartmentPriceByKey[adHousingTypeField.value]);
  };

  var setTimeFieldValue = function () {
    adTimeInField.onchange = function () {
      adTimeOutField.selectedIndex = this.selectedIndex;
    };
    adTimeOutField.onchange = function () {
      adTimeInField.selectedIndex = this.selectedIndex;
    };
  };

  var setInputFileAttribute = function () {
    adAvatar.setAttribute('accept', 'image/png, image/jpeg');
    adImg.setAttribute('accept', 'image/png, image/jpeg');
  };

  var setDisabledAttribute = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].setAttribute('disabled', 'disabled');
    }
  };

  var setDisabledFormElements = function () {
    setDisabledAttribute(formFieldsets);
    setDisabledAttribute(formSelects);
    setDisabledAttribute(formInputs);
    setDisabledAttribute(formButtons);
  };

  var setActiveFormCondition = function () {
    adForm.classList.remove('ad-form--disabled');
    removeDisabledFormElements();
    checkInputTitleValidity();
    checkAndSetInputAddress();
    checkHousingType();
    checkRoomGuestsValidity();
    setTimeFieldValue();
  };

  var setDisabledFormCondition = function () {
    setDisabledFormElements(adForm);
    setInputFileAttribute();
    checkAndSetInputAddress();
  };

  var removeDisabledAttribute = function (elements) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].removeAttribute('disabled');
    }
  };

  var removeDisabledFormElements = function () {
    removeDisabledAttribute(formFieldsets);
    removeDisabledAttribute(formSelects);
    removeDisabledAttribute(formInputs);
    removeDisabledAttribute(formButtons);
  };

  // Ф-ции событий.

  var onInputTitleValidity = function () {
    checkInputTitleValidity();
  };

  var onChangesHousingType = function () {
    checkHousingType();
  };

  var onInputPriceValidity = function () {
    checkInputPriceValidity();
  };

  var onChangesGuestsQuantity = function () {
    checkRoomGuestsValidity();
  };

  var onChangesTime = function () {
    setTimeFieldValue();
  };

  var onFormChange = function () {
    adTitleField.addEventListener('input', onInputTitleValidity);
    adHousingTypeField.addEventListener('change', onChangesHousingType);
    adPriceField.addEventListener('input', onInputPriceValidity);
    adRoomQuantityField.addEventListener('change', onChangesGuestsQuantity);
    adGuestsQuantityField.addEventListener('change', onChangesGuestsQuantity);
    adTimeInField.addEventListener('change', onChangesTime);
    adTimeOutField.addEventListener('change', onChangesTime);
  };


  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(adForm), window.events.onCheckCondition);
  });

  window.form = {
    adForm: adForm,
    formFieldsets: formFieldsets,
    formSelects: formSelects,
    formInputs: formInputs,
    formButtons: formButtons,
    adAvatar: adAvatar,
    adTitleField: adTitleField,
    adAddressField: adAddressField,
    adHousingTypeField: adHousingTypeField,
    adPriceField: adPriceField,
    adRoomQuantityField: adRoomQuantityField,
    adGuestsQuantityField: adGuestsQuantityField,
    adTimeInField: adTimeInField,
    adTimeOutField: adTimeOutField,
    adImg: adImg,

    getMinPriceValue: getMinPriceValue,

    checkAndSetInputAddress: checkAndSetInputAddress,
    checkInputPriceValidity: checkInputPriceValidity,
    checkRoomGuestsValidity: checkRoomGuestsValidity,
    checkInputTitleValidity: checkInputTitleValidity,
    checkHousingType: checkHousingType,

    setTimeFieldValue: setTimeFieldValue,
    setInputFileAttribute: setInputFileAttribute,
    setDisabledAttribute: setDisabledAttribute,
    setDisabledFormElements: setDisabledFormElements,
    setActiveFormCondition: setActiveFormCondition,
    setDisabledFormCondition: setDisabledFormCondition,

    removeDisabledAttribute: removeDisabledAttribute,
    removeDisabledFormElements: removeDisabledFormElements,

    onFormChange: onFormChange,
    onChangesTime: onChangesTime,
    onChangesGuestsQuantity: onChangesGuestsQuantity,
    onInputPriceValidity: onInputPriceValidity,
    onChangesHousingType: onChangesHousingType,
    onInputTitleValidity: onInputTitleValidity
  };
})();
