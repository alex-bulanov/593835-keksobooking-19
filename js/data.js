'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE_VALUE = 1000000;
  var PINS_QUANTITY = 8;
  var MAX_PIN_X_OFFSET = 1168;
  var MIN_PIN_X_OFFSET = -32;
  var MAX_PIN_Y_OFFSET = 623;
  var MIN_PIN_Y_OFFSET = 2;
  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var checkTimes = ['12:00', '13:00', '14:00'];
  var apartments = ['palace', 'flat', 'house', 'bungalo'];
  var pluralForms = ['комната', 'комнаты', 'комнат'];

  var apartmentNamesByKey = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var apartmentPriceByKey = {
    'palace': 10000,
    'flat': 1000,
    'house': 5000,
    'bungalo': 0
  };

  window.data = {
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    MAX_PRICE_VALUE: MAX_PRICE_VALUE,
    PINS_QUANTITY: PINS_QUANTITY,
    MAX_PIN_X_OFFSET: MAX_PIN_X_OFFSET,
    MIN_PIN_X_OFFSET: MIN_PIN_X_OFFSET,
    MAX_PIN_Y_OFFSET: MAX_PIN_Y_OFFSET,
    MIN_PIN_Y_OFFSET: MIN_PIN_Y_OFFSET,
    apartmentPriceByKey: apartmentPriceByKey,
    apartmentNamesByKey: apartmentNamesByKey,
    features: features,
    photos: photos,
    checkTimes: checkTimes,
    apartments: apartments,
    pluralForms: pluralForms
  };
})();
