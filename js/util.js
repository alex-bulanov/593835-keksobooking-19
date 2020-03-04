'use strict';

(function () {
  var START_MAIN_PIN_LEFT_COORINATE = 570;
  var START_MAIN_PIN_TOP_COORINATE = 375;
  var ESC_KEY = 'Escape';

  var DIVIDER_FOR_A_LARGE_NUMBER = 100;
  var DIVIDER_OF_THE_NUMBER = 10;
  var INDEX_FOR_ONE = 1;
  var START_INDEX_FROM_TWO_TO_FOUR = 2;
  var END_INDEX_FROM_TWO_TO_FOUR = 4;
  var START_INDEX_FROM_FIVE_TO_TWENTY = 5;
  var END_INDEX_FROM_FIVE_TO_TWENTY = 20;

  var getWordEndingString = function (roomsQuantity, words) {
    var endingWord = '';

    if (roomsQuantity % DIVIDER_FOR_A_LARGE_NUMBER >= START_INDEX_FROM_FIVE_TO_TWENTY
      && roomsQuantity % DIVIDER_FOR_A_LARGE_NUMBER <= END_INDEX_FROM_FIVE_TO_TWENTY) {
      endingWord = words[2];
    } else if (roomsQuantity % DIVIDER_OF_THE_NUMBER === INDEX_FOR_ONE) {
      endingWord = words[0];
    } else if (roomsQuantity % DIVIDER_OF_THE_NUMBER >= START_INDEX_FROM_TWO_TO_FOUR
      && roomsQuantity % DIVIDER_OF_THE_NUMBER <= END_INDEX_FROM_TWO_TO_FOUR) {
      endingWord = words[1];
    } else {
      endingWord = words[2];
    }

    return endingWord;
  };

  var removeAllChildren = function (element) {
    element.innerHTML = '';
  };

  var getRandomNumber = function (minValue, maxValue) {
    return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
  };

  var getRandomArrayElement = function (arr) {
    var max = arr.length - 1;
    var min = 0;

    return arr[getRandomNumber(min, max)];
  };

  var getRandomLengthArray = function (arr) {
    return arr.slice(0, getRandomNumber(1, arr.length));
  };

  var pageReset = function () {
    var pinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    var popup = document.querySelector('.popup');

    if (popup) {
      var cardClose = popup.querySelector('.popup__close');
      cardClose.removeEventListener('keydown', window.events.onCloseButtonCard);
      document.removeEventListener('keydown', window.events.onEscPressCard);
      popup.remove();
    }

    window.pins.remove();
    map.classList.add('map--faded');
    pinMain.style.top = START_MAIN_PIN_TOP_COORINATE + 'px';
    pinMain.style.left = START_MAIN_PIN_LEFT_COORINATE + 'px';
    window.form.setDisabledFormCondition();
    pinMain.addEventListener('mousedown', window.drag.onMainPinMouseDown);
    pinMain.addEventListener('click', window.events.onMainPinLeftMouseClick);

  };

  window.util = {
    ESC_KEY: ESC_KEY,
    pageReset: pageReset,
    getRandomNumber: getRandomNumber,
    getRandomLengthArray: getRandomLengthArray,
    getRandomArrayElement: getRandomArrayElement,
    removeAllChildren: removeAllChildren,
    getWordEndingString: getWordEndingString
  };
})();

