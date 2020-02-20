'use strict';

(function () {
  var MAX_PIN_X_OFFSET = 1168;
  var MIN_PIN_X_OFFSET = -32;
  var MAX_PIN_Y_OFFSET = 513;
  var MIN_PIN_Y_OFFSET = 43;

  var pinMain = document.querySelector('.map__pin--main');

  var onMainPinMouseDown = function (evtDown) {
    evtDown.preventDefault();

    var startCoords = {
      x: evtDown.clientX,
      y: evtDown.clientY
    };

    var dragged = false;

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

      if ((pinMain.offsetLeft - shift.x) <= MAX_PIN_X_OFFSET && (pinMain.offsetLeft - shift.x) >= MIN_PIN_X_OFFSET) {
        pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
      }

      if ((pinMain.offsetTop - shift.y) <= MAX_PIN_Y_OFFSET && (pinMain.offsetTop - shift.y) >= MIN_PIN_Y_OFFSET) {
        pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
      }

      window.form.setInputAddress();
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);


      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinMain.removeEventListener('click', onClickPreventDefault);
        };
        pinMain.addEventListener('click', onClickPreventDefault);
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  window.drag = {
    onMainPinMouseDown: onMainPinMouseDown
  };
})();
