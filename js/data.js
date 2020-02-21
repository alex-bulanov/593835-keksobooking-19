'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAX_PRICE_VALUE = 1000000;

  var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
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
    apartmentPriceByKey: apartmentPriceByKey,
    apartmentNamesByKey: apartmentNamesByKey,
    features: features,
    apartments: apartments,
    pluralForms: pluralForms
  };
})();
