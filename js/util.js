'use strict';

(function () {
  var START_MAIN_PIN_LEFT_COORINATE = 570;
  var START_MAIN_PIN_TOP_COORINATE = 375;
  var ESC_KEY = 'Escape';

  var getWordEndingString = function (roomsQuantity, words) {
    var endingWord = '';
    var index = null;

    roomsQuantity = roomsQuantity % 100;

    if (roomsQuantity >= 11 && roomsQuantity <= 19) {
      endingWord = words[2];
    } else {
      index = roomsQuantity % 10;
      switch (index) {
        case (1):
          endingWord = words[0];
          break;
        case (2):
        case (3):
        case (4):
          endingWord = words[1];
          break;
        default:
          endingWord = words[2];
      }
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

    return arr[Math.floor(Math.random() * (max - min + 1) + min)];
  };

  var getRandomLengthArray = function (arr) {
    return arr.slice(0, getRandomNumber(1, arr.length));
  };

  var pageReset = function () {
    var pinMain = document.querySelector('.map__pin--main');
    var map = document.querySelector('.map');
    window.card.removeAdCardElement();
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

