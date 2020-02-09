'use strict';

(function () {
  var pinMain = document.querySelector('.map__pin--main');

  var renderPins = function (objects) {
    var mapPins = document.querySelector('.map__pins');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < objects.length; i++) {
      fragment.appendChild(objects[i]);
      mapPins.appendChild(fragment);
    }

    // Вешаем слушатель.

    var adPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adPins.length; j++) {
      adPins[j].addEventListener('click', onPinLeftMouseClick);
    }
  };

  var renderCard = function (element) {
    var map = document.querySelector('.map');
    var mapFilterContainer = document.querySelector('.map__filters-container');
    var fragment = document.createDocumentFragment();
    fragment.appendChild(element);
    map.insertBefore(fragment, mapFilterContainer);
  };

  var onPinLeftMouseClick = function (evt) {
    var currentPin = evt.currentTarget;
    var currentIndex = currentPin.dataset.index;
    var currentPinObject = window.pin.getAdObject([currentIndex]);
    var currentCard = window.card.getAdCardElement(currentPinObject);
    var oldCard = document.querySelector('.map__card');
    if (document.contains(oldCard)) {
      oldCard.remove();
    }
    renderCard(currentCard);
  };

  // var onMainPinMouseDown = function (evtDown) {
  //   evtDown.preventDefault();

  //   var startCoords = {
  //     x: evtDown.clientX,
  //     y: evtDown.clientY
  //   };

  //   var dragged = false;

  //   var onMouseMove = function (moveEvt) {
  //     moveEvt.preventDefault();

  //     var shift = {
  //       x: startCoords.x - moveEvt.clientX,
  //       y: startCoords.y - moveEvt.clientY
  //     };

  //     startCoords = {
  //       x: moveEvt.clientX,
  //       y: moveEvt.clientY
  //     };

  //     if ((pinMain.offsetLeft - shift.x) <= window.data.MAX_PIN_X_OFFSET && (pinMain.offsetLeft - shift.x) >= window.data.MIN_PIN_X_OFFSET) {
  //       pinMain.style.left = (pinMain.offsetLeft - shift.x) + 'px';
  //     }

  //     if ((pinMain.offsetTop - shift.y) <= window.data.MAX_PIN_Y_OFFSET && (pinMain.offsetTop - shift.y) >= window.data.MIN_PIN_Y_OFFSET) {
  //       pinMain.style.top = (pinMain.offsetTop - shift.y) + 'px';
  //     }

  //     window.form.checkAndSetInputAddress();
  //   };

  //   var onMouseUp = function (upEvt) {
  //     upEvt.preventDefault();

  //     document.removeEventListener('mousemove', onMouseMove);
  //     document.removeEventListener('mouseup', onMouseUp);


  //     if (dragged) {
  //       var onClickPreventDefault = function (clickEvt) {
  //         clickEvt.preventDefault();
  //         pinMain.removeEventListener('click', onClickPreventDefault);
  //       };
  //       pinMain.addEventListener('click', onClickPreventDefault);
  //     }
  //   };

  //   document.addEventListener('mousemove', onMouseMove);
  //   document.addEventListener('mouseup', onMouseUp);
  // };

  var onMainPinLeftMouseClick = function (evt) {
    var map = document.querySelector('.map');

    if (evt.which === 1) {
      map.classList.remove('map--faded');
      // Активируем форму.
      window.form.setActiveFormCondition();
      window.form.adForm.addEventListener('change', window.form.onFormChange);

      var AdObjects = window.pin.getAdObjects();
      var pinsForRend = window.pin.getPins(AdObjects);

      // Отображаем пины.
      renderPins(pinsForRend);
      pinMain.removeEventListener('click', onMainPinLeftMouseClick);

    }
  };

  window.form.setDisabledFormCondition();
  pinMain.addEventListener('mousedown', window.drag.onMainPinMouseDown);
  pinMain.addEventListener('click', onMainPinLeftMouseClick);

})();
