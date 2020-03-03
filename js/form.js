'use strict';

(function () {
  var pinMainEdgeHeight = 22;

  var adForm = document.querySelector('.ad-form');
  var adPhoto = adForm.querySelector('.ad-form__photo');
  var adReset = adForm.querySelector('.ad-form__reset');
  var formFieldsets = adForm.querySelectorAll('fieldset');
  var formSelects = adForm.querySelectorAll('select');
  var formInputs = adForm.querySelectorAll('input');
  var formButtons = adForm.querySelectorAll('button');

  var adAvatar = adForm.querySelector('#avatar');
  var adTitleField = adForm.querySelector('#title');
  var adAddressField = adForm.querySelector('#address');
  var adHousingTypeField = adForm.querySelector('#type');
  var adPriceField = adForm.querySelector('#price');
  var adRoomQuantityField = adForm.querySelector('#room_number');
  var adGuestsQuantityField = adForm.querySelector('#capacity');
  var adTimeInField = adForm.querySelector('#timein');
  var adTimeOutField = adForm.querySelector('#timeout');
  var adImg = adForm.querySelector('#images');

  var getMinPriceValue = function () {
    var minPriceValue = window.data.apartmentPriceByKey[adHousingTypeField.value];
    return minPriceValue;
  };

  var setInputAddress = function () {
    adAddressField.setAttribute('readonly', 'readonly');

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
      addressСoordinateY = Math.floor(pinTopСoordinate + pinHeight + pinMainEdgeHeight);
    }
    var adAddressValue = addressСoordinateX + ', ' + addressСoordinateY;
    adAddressField.value = adAddressValue;
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
    adPriceField.placeholder = window.data.apartmentPriceByKey[adHousingTypeField.value];
    adPriceField.setAttribute('required', 'required');
    adPriceField.setAttribute('min', window.data.apartmentPriceByKey[adHousingTypeField.value]);
    checkInputPriceValidity();
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
    setInputAddress();
    checkHousingType();
    checkRoomGuestsValidity();
    setTimeFieldValue();
  };

  var setDisabledFormCondition = function () {
    setDisabledFormElements(adForm);
    setInputFileAttribute();
    adForm.reset();
    window.filter.mapFilter.reset();
    window.util.removeAllChildren(adPhoto);
    adForm.classList.add('ad-form--disabled');
    setInputAddress();
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

  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(adForm), window.events.onCheckCondition);
  });

  window.form = {
    adForm: adForm,
    adReset: adReset,
    setInputAddress: setInputAddress,
    setActiveFormCondition: setActiveFormCondition,
    setDisabledFormCondition: setDisabledFormCondition,
    setTimeFieldValue: setTimeFieldValue,
    checkInputTitleValidity: checkInputTitleValidity,
    checkHousingType: checkHousingType,
    checkInputPriceValidity: checkInputPriceValidity,
    checkRoomGuestsValidity: checkRoomGuestsValidity
  };
})();
