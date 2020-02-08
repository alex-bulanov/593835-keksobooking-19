'use strict';

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

// Ф-ции работы с пинами.
// ф-ция создания объекта объявления.

var getAdObject = function (index) {
  var map = document.querySelector('.map');
  var mapStyle = getComputedStyle(map);
  var mapWidth = parseInt(mapStyle.width, 10);
  var pin = document.querySelector('.map__pin');
  var pinStyle = getComputedStyle(pin);
  var pinWidth = parseInt(pinStyle.width, 10);
  var object = {
    author: {
      avatar: 'img/avatars/user0' + (index + 1) + '.png'
    },
    offer: {
      title: 'Title',
      address: '600, 350',
      price: 200,
      type: getRandomArrayElement(window.data.apartments),
      rooms: getRandomNumber(1, 10),
      guests: getRandomNumber(1, 10),
      checkin: getRandomArrayElement(window.data.checkTimes),
      checkout: getRandomArrayElement(window.data.checkTimes),
      features: getRandomLengthArray(window.data.features),
      description: 'тут будет описание',
      photos: getRandomLengthArray(window.data.photos)
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

// ф-ция получения карточки.

var getAdCardElement = function (object) {
  var cardTemplate = document.getElementById('card').content.querySelector('.map__card');
  var cardElement = cardTemplate.cloneNode(true);
  var cardClose = cardElement.querySelector('.popup__close');
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
  var cardAvatar = cardElement.querySelector('.popup__avatar');
  var guestsSting = ' гостя';

  if (object.offer.guests > 1) {
    guestsSting = ' гостей';
  }

  var currentRoomsValue = object.offer.rooms;
  var roomString = getNumEnding(currentRoomsValue, window.data.pluralForms);

  cardAvatar.src = object.author.avatar;
  cardTitle.textContent = object.offer.title;
  cardAddress.textContent = object.offer.address;
  cardPrice.textContent = object.offer.price + '₽/ночь';
  cardApartmentsType.textContent = window.data.apartmentNamesByKey[object.offer.type];
  cardCapacity.textContent = currentRoomsValue + ' ' + roomString + ' '
  + object.offer.guests + guestsSting;
  cardCheckTime.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
  cardDescription.textContent = object.offer.description;

  if (object.offer.photos.length <= 1) {
    cardPhotoImg.src = object.offer.photos;

  } else {
    removeAllChildren(cardPhotos);

    var fragment = document.createDocumentFragment();
    for (var i = 0; i < object.offer.photos.length; i++) {

      var element = document.createElement('IMG');
      element.classList.add('popup__photo');
      element.style.width = '45px';
      element.style.height = '40px';
      element.src = object.offer.photos[i];
      element.alt = 'Фотография жилья';
      fragment.appendChild(element);
    }
    cardPhotos.appendChild(fragment);
  }

  removeAllChildren(cardFeaturesList);

  for (var j = 0; j < object.offer.features.length; j++) {
    var item = document.createElement('LI');
    item.classList.add('popup__feature');
    item.classList.add('popup__feature--' + object.offer.features[j]);
    cardFeaturesList.appendChild(item);
  }

  cardClose.addEventListener('click', function () {
    cardElement.remove();
  });

  document.addEventListener('keydown', onEscPressClosePopup);

  return cardElement;
};

// ф-ция отрисовки пинов на карте.

var renderPins = function () {
  var mapPins = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  var pins = getPins(pinDataObjects);

  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(pins[i]);
    mapPins.appendChild(fragment);
  }

  // Вешаем слушатель.

  var adPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
  for (var j = 0; j < adPins.length; j++) {
    adPins[j].addEventListener('click', onPinLeftMouseClick);
  }
};

// ф-ция отрисовки одной карточки

var renderCard = function (element) {
  var map = document.querySelector('.map');
  var mapFilterContainer = document.querySelector('.map__filters-container');
  var fragment = document.createDocumentFragment();
  fragment.appendChild(element);
  map.insertBefore(fragment, mapFilterContainer);
};


// Ф-ции событий.

var onPinLeftMouseClick = function (evt) {
  var currentPin = evt.currentTarget;
  var currentIndex = currentPin.dataset.index;
  var currentCard = getAdCardElement(pinDataObjects[currentIndex]);
  var oldCard = document.querySelector('.map__card');
  if (document.contains(oldCard)) {
    oldCard.remove();
  }
  renderCard(currentCard);
};

var onEscPressClosePopup = function (evt) {
  var popup = document.querySelector('.popup');
  if (evt.key === window.data.ESC_KEY) {
    popup.remove();
  }
  document.removeEventListener('keydown', onEscPressClosePopup);
};

var onMainPinLeftMouseClick = function (evt) {
  var map = document.querySelector('.map');

  if (evt.which === 1) {
    map.classList.remove('map--faded');
    // Активируем форму.
    window.form.setActiveFormCondition();

    window.form.adForm.addEventListener('change', window.form.onFormChange());
    // Получем массив данных пинов..
    getPins(pinDataObjects);
    // Отображаем пины.
    renderPins();
  }

  pinMain.removeEventListener('click', onMainPinLeftMouseClick);
};

// События после загрузки страницы.

// Получаем данные для пинов.

var pinDataObjects = getAdObjects();

// 1. Деактивируем форму и устанавливаем атрибуты на инпут для ижображений.


window.form.setDisabledFormCondition();


// 2. Слушаем событие перехода в активный режим.

var pinMain = document.querySelector('.map__pin--main');

pinMain.addEventListener('click', onMainPinLeftMouseClick);

