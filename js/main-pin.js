'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStyle = getComputedStyle(pinMain);
  var pinWidth = parseInt(pinMainStyle.width, 10);
  var pinHeight = parseInt(pinMainStyle.height, 10);
  var pinLeftСoordinate = parseInt(pinMainStyle.left, 10);
  var pinTopСoordinate = parseInt(pinMainStyle.top, 10);

  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: pinLeftСoordinate,
      y: pinTopСoordinate
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
    };


    document.addEventListener('mousemove', onMouseMove);
    // document.addEventListener('mouseup', onMouseUp);
  });

})();
