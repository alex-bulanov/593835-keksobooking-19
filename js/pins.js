'use strict';

(function () {

  var remove = function () {
    var adPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var j = 0; j < adPins.length; j++) {
      adPins[j].removeEventListener('click', window.events.onPinLeftMouseClick);
      adPins[j].remove();
    }
  };

  var create = function (objects) {
    var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
    var pins = [];

    for (var i = 0; i < objects.length; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      var currentObject = objects[i];
      pinElement.querySelector('img').src = currentObject.author.avatar;
      pinElement.querySelector('img').alt = currentObject.offer.title;
      pinElement.style.left = currentObject.location.x + 'px';
      pinElement.style.top = currentObject.location.y + 'px';
      pinElement.dataset.index = objects[i].currentObjIndex;
      pinElement.addEventListener('click', window.events.onPinLeftMouseClick);
      pins.push(pinElement);
    }

    return pins;
  };

  window.pins = {
    create: create,
    remove: remove
  };
})();
