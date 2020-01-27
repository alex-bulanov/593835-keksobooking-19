'use strict';

var map = document.querySelector('.map');
var pin = document.querySelector('.map__pin');
var mapPins = document.querySelector('.map__pins');
var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');

map.classList.remove('map--faded');
var mapStyle = getComputedStyle(map);
var mapWidth = parseInt(mapStyle.width, 10);
var pinStyle = getComputedStyle(pin);
var pinWidth = parseInt(pinStyle.width, 10);

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var times = ['12:00', '13:00', '14:00'];
var housing = ['palace', 'flat', 'house', 'bungalo'];

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

var getArray = function (arr) {
  return arr.slice(0, getRandomNumber(1, arr.length));
};

var generatingObject = function (index) {
  var object = {
    author: {
      avatar: 'img/avatars/user' + '0' + (index + 1) + '.png'
    },
    offer: {
      title: 'Title',
      address: '600, 350',
      price: 200,
      type: housing[getRandomNumber(0, housing.length - 1)],
      rooms: 5,
      guests: 5,
      checkin: times[getRandomNumber(0, times.length - 1)],
      checkout: times[getRandomNumber(0, times.length - 1)],
      features: getArray(features),
      description: 'description',
      photos: getArray(photos)
    },
    location: {
      x: getRandomNumber(pinWidth, mapWidth - pinWidth),
      y: getRandomNumber(130, 630)
    }
  };
  return object;
};

var generatingObjects = function () {
  var newArr = [];
  for (var i = 0; i < 8; i++) {
    newArr.push(generatingObject(i));
  }
  return newArr;
};

var objects = generatingObjects();


for (var i = 0; i < objects.length; i++) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector('img').src = objects[i].author.avatar;
  pinElement.querySelector('img').alt = objects[i].offer.title;
  pinElement.style.left = objects[i].location.x + 'px';
  pinElement.style.top = objects[i].location.y + 'px';

  var fragment = document.createDocumentFragment();
  fragment.appendChild(pinElement);
  mapPins.appendChild(fragment);
}

