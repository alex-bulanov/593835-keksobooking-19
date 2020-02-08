'use strict';

(function () {

  var getNumEnding = function (quantity, aEndings) {
    var sEnding = '';
    var index = null;

    quantity = quantity % 100;

    if (quantity >= 11 && quantity <= 19) {
      sEnding = aEndings[2];
    } else {
      index = quantity % 10;
      switch (index) {
        case (1):
          sEnding = aEndings[0];
          break;
        case (2):
        case (3):
        case (4):
          sEnding = aEndings[1];
          break;
        default:
          sEnding = aEndings[2];
      }
    }

    return sEnding;
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

  window.util = {
    getRandomNumber: getRandomNumber,
    getRandomLengthArray: getRandomLengthArray,
    getRandomArrayElement: getRandomArrayElement,
    removeAllChildren: removeAllChildren,
    getNumEnding: getNumEnding
  };
})();

