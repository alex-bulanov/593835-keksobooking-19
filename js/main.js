'use strict';

var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var checkTimes = ['12:00', '13:00', '14:00'];
var apartments = ['palace', 'flat', 'house', 'bungalo'];
var pluralForms = ['комната', 'комнаты', 'комнат'];

var apartmentNamesByKey = {
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
      type: getRandomArrayElement(apartments),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(checkTimes),
      checkout: getRandomArrayElement(checkTimes),
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
  var newArray = [];

  for (var i = 0; i < 8; i++) {
    newArray.push(getAdObject(i));
  }

  return newArray;
};

// ф-ция создания массива пинов.

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

// ф-ция получения строки с множественным окончанием.

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
  var guestsSting = ' гостя';

  if (object.offer.guests > 1) {
    guestsSting = ' гостей';
  }

  var currentRoomsValue = object.offer.rooms;
  var roomString = getNumEnding(currentRoomsValue, pluralForms);

  cardTitle.textContent = object.offer.title;
  cardAddress.textContent = object.offer.address;
  cardPrice.textContent = object.offer.price + '₽/ночь';
  cardApartmentsType.textContent = apartmentNamesByKey[object.offer.type];
  cardCapacity.textContent = currentRoomsValue + ' ' + roomString + ' '
  + object.offer.guests + guestsSting;
  cardCheckTime.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
  cardDescription.textContent = object.offer.description;

  if (object.offer.photos.length <= 1) {
    cardPhotoImg.src = object.offer.photos;

  } else {
    removeAllChildren(cardPhotos);

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

  removeAllChildren(cardFeaturesList);

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
var adsObjects = getAdObjects();

// получаем массив пинов.
var pins = getPins(adsObjects);

// отрисовываем пины на карте
renderPins(pins);

// создаем одну карточку
var oneCard = getAdCardElement(adsObjects[0]);

// отрисовываем карточку на карте.
renderCard(oneCard);
