'use strict';

(function () {
  var getAdObject = function (index) {
    var map = document.querySelector('.map');
    var mapStyle = getComputedStyle(map);
    var mapWidth = parseInt(mapStyle.width, 10);
    var pin = document.querySelector('.map__pin');
    var pinStyle = getComputedStyle(pin);
    var pinWidth = parseInt(pinStyle.width, 10);
    var object = {
      author: {
        avatar: 'img/avatars/user0' + (parseInt(index, 10) + 1) + '.png'
      },
      offer: {
        title: 'Title',
        address: '600, 350',
        price: 200,
        type: window.util.getRandomArrayElement(window.data.apartments),
        rooms: window.util.getRandomNumber(1, 10),
        guests: window.util.getRandomNumber(1, 10),
        checkin: window.util.getRandomArrayElement(window.data.checkTimes),
        checkout: window.util.getRandomArrayElement(window.data.checkTimes),
        features: window.util.getRandomLengthArray(window.data.features),
        description: 'тут будет описание',
        photos: window.util.getRandomLengthArray(window.data.photos)
      },
      location: {
        x: window.util.getRandomNumber(pinWidth, mapWidth - pinWidth),
        y: window.util.getRandomNumber(130, 630)
      }
    };

    return object;
  };

  var getAdObjects = function () {
    var newArray = [];

    for (var i = 0; i < window.data.PINS_QUANTITY; i++) {
      newArray.push(getAdObject(i));
    }

    return newArray;
  };

  var getPins = function (objects) {
    var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
    var pins = [];

    for (var i = 0; i < objects.length; i++) {
      var pinElement = pinTemplate.cloneNode(true);
      var currentObject = objects[i];
      pinElement.querySelector('img').src = currentObject.author.avatar;
      pinElement.querySelector('img').alt = currentObject.offer.title;
      pinElement.style.left = currentObject.location.x + 'px';
      pinElement.style.top = currentObject.location.y + 'px';

      pinElement.dataset.index = i;
      pins.push(pinElement);
    }

    return pins;
  };

  window.pin = {
    getAdObject: getAdObject,
    getAdObjects: getAdObjects,
    getPins: getPins
  };
})();
