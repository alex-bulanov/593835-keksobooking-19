'use strict';

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkTimes = ['12:00', '13:00', '14:00'];
var apartments = ['palace', 'flat', 'house', 'bungalo'];

var apart = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};

var map = document.querySelector('.map');
var pin = document.querySelector('.map__pin');

var mapPins = document.querySelector('.map__pins');
var mapFilterContainer = document.querySelector('.map__filters-container');

var mapStyle = getComputedStyle(map);
var mapWidth = parseInt(mapStyle.width, 10);
var pinStyle = getComputedStyle(pin);
var pinWidth = parseInt(pinStyle.width, 10);


var elemDelete = function (newdiv) {
  newdiv.parentNode.removeChild(newdiv);
};

var getCleanList = function (list) {
  var children = list.children;
  for (var i = children.length - 1; i >= 0; i--) {
    var child = children[i];
    child.parentElement.removeChild(child);
  }
};

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

var getRandomElement = function (arr) {
  var max = arr.length - 1;
  var min = 0;
  return arr[Math.floor(Math.random() * (max - min + 1) + min)];
};

var getRandomLengthArray = function (arr) {
  return arr.slice(0, getRandomNumber(1, arr.length));
};

// ф-ция создания объекта объявления.

var getAdObject = function (index) {
  var object = {
    author: {
      avatar: 'img/avatars/user' + '0' + (index + 1) + '.png'
    },
    offer: {
      title: 'Title',
      address: '600, 350',
      price: 200,
      type: getRandomElement(apartments),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomElement(checkTimes),
      checkout: getRandomElement(checkTimes),
      features: getRandomLengthArray(features),
      description: 'тут будет описание',
      photos: getRandomLengthArray(photos)
    },
    location: {
      x: getRandomNumber(pinWidth, mapWidth - pinWidth),
      y: getRandomNumber(130, 630)
    }
  };
  return object;
};

// ф-ция создания массива с 8 объектами.

var getAdObjects = function () {
  var newArr = [];
  for (var i = 0; i < 8; i++) {
    newArr.push(getAdObject(i));
  }
  return newArr;
};

// ф-ция создания массива пинов.

var getPins = function (objects) {
  var pinTemplate = document.getElementById('pin').content.querySelector('.map__pin');
  var pins = [];

  for (var i = 0; i < objects.length; i++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.querySelector('img').src = objects[i].author.avatar;
    pinElement.querySelector('img').alt = objects[i].offer.title;
    pinElement.style.left = objects[i].location.x + 'px';
    pinElement.style.top = objects[i].location.y + 'px';
    pins.push(pinElement);
  }

  return pins;
};

// ф-ция отрисовки пинов на карте.

var renderPins = function (elements) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < elements.length; i++) {
    fragment.appendChild(elements[i]);
    mapPins.appendChild(fragment);
  }
};

// ф-ция создания карточки.

var getAdCardElement = function (object) {
  var cardTemplate = document.getElementById('card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var cardFeaturesList = cardElement.querySelector('.popup__features');
  var cardTitle = cardElement.querySelector('.popup__title');
  var cardAddress = cardElement.querySelector('.popup__text--address');
  var cardPrice = cardElement.querySelector('.popup__text--price');
  var cardApartmentsType = cardElement.querySelector('.popup__type');
  var cardCapacity = cardElement.querySelector('.popup__text--capacity');
  var cardCheckTime = cardElement.querySelector('.popup__text--time');
  var cardDescription = cardElement.querySelector('.popup__description');
  var cardPhotos = cardElement.querySelector('.popup__photos');
  var cardPhotoImg = cardElement.querySelector('.popup__photos img');

  var roomString = '';
  switch (object.offer.rooms) {
    case 1 :
      roomString = ' комната для ';
      break;
    case 2:
    case 3:
    case 4:
      roomString = ' комнаты для ';
      break;
    default:
      roomString = ' комнат для ';
  }

  var guestsSting = ' гостя';

  if (object.offer.guests > 1) {
    guestsSting = ' гостей';
  }

  cardTitle.textContent = object.offer.title;
  cardAddress.textContent = object.offer.address;
  cardPrice.textContent = object.offer.price + '₽/ночь';
  cardApartmentsType.textContent = apart[object.offer.type];
  cardCapacity.textContent = object.offer.rooms + roomString + object.offer.guests + guestsSting;
  cardCheckTime.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
  cardDescription.textContent = object.offer.description;

  if (object.offer.photos.length <= 1) {
    cardPhotoImg.src = object.offer.photos;

  } else {
    elemDelete(cardPhotoImg);

    for (var i = 0; i < object.offer.photos.length; i++) {
      var element = document.createElement('IMG');
      element.classList.add('popup__photo');
      element.style.width = '45px';
      element.style.height = '40px';
      element.src = object.offer.photos[i];
      element.alt = 'Фотография жилья';
      cardPhotos.appendChild(element);
    }
  }

  getCleanList(cardFeaturesList);

  for (var j = 0; j < object.offer.features.length; j++) {
    var item = document.createElement('LI');
    item.classList.add('popup__feature');
    item.classList.add('popup__feature--' + object.offer.features[j]);
    cardFeaturesList.appendChild(item);
  }

  return cardElement;
};

// ф-ция отрисовки одной карточки

var renderCard = function (element) {
  var fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  map.insertBefore(fragment, mapFilterContainer);
};

map.classList.remove('map--faded');


// получаем массив с объектами.
var adObjects = getAdObjects();

// получаем массив пинов.
var pins = getPins(adObjects);

// отрисовываем пины на карте
renderPins(pins);

// создаем одну карточку
var oneCard = getAdCardElement(adObjects[0]);

// отрисовываем карточку на карте.
renderCard(oneCard);
