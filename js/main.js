'use strict';

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;
var MAX_PRICE_VALUE = 1000000;

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

var apartmentPriceByKey = {
  'palace': 10000,
  'flat': 1000,
  'house': 5000,
  'bungalo': 0
};


// Описание ф-ций при загрузки страницы.

var setImageAttribute = function () {
  var adAvatar = document.getElementById('avatar');
  var adImg = document.getElementById('images');
  adAvatar.setAttribute('accept', 'image/png, image/jpeg');
  adImg.setAttribute('accept', 'image/png, image/jpeg');
};

var setDisabledAttribute = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].setAttribute('disabled', 'disabled');
  }
};

var setDisabledFormElements = function (form) {
  var formFieldsets = form.querySelectorAll('fieldset');
  var formSelects = form.querySelectorAll('select');
  var formInputs = form.querySelectorAll('input');
  var formButtons = form.querySelectorAll('button');

  setDisabledAttribute(formFieldsets);
  setDisabledAttribute(formSelects);
  setDisabledAttribute(formInputs);
  setDisabledAttribute(formButtons);
};

var setNonActiveAddress = function () {
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStyle = getComputedStyle(pinMain);
  var pinWidth = parseInt(pinMainStyle.width, 10);
  var pinHeight = parseInt(pinMainStyle.height, 10);
  var pinLeftСoordinate = parseInt(pinMainStyle.left, 10);
  var pinTopСoordinate = parseInt(pinMainStyle.top, 10);
  var adAddressField = document.getElementById('address');
  var addressСoordinateX = Math.floor(pinLeftСoordinate + pinWidth / 2);
  var addressСoordinateY = Math.floor(pinTopСoordinate + pinHeight / 2);
  var adAddressValue = addressСoordinateX + ', ' + addressСoordinateY;
  adAddressField.value = adAddressValue;
  adAddressField.value = adAddressValue;
};

var setActiveAddress = function () {
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStyle = getComputedStyle(pinMain);
  var pinWidth = parseInt(pinMainStyle.width, 10);
  var pinHeight = parseInt(pinMainStyle.height, 10);
  var pinLeftСoordinate = parseInt(pinMainStyle.left, 10);
  var pinTopСoordinate = parseInt(pinMainStyle.top, 10);
  var adAddressField = document.getElementById('address');
  var addressСoordinateX = Math.floor(pinLeftСoordinate + pinWidth / 2);
  var addressСoordinateY = Math.floor(pinTopСoordinate + pinHeight + 22);
  var adAddressValue = addressСoordinateX + ', ' + addressСoordinateY;
  adAddressField.value = adAddressValue;
  adAddressField.value = adAddressValue;
};

// Описание ф-ций при переходе в активный режим страницы.

var removeAllChildren = function (element) {
  element.innerHTML = '';
};

var removeDisabledAttribute = function (elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].removeAttribute('disabled');
  }
};

var removeDisabledFormElements = function (form) {
  var formFieldsets = form.querySelectorAll('fieldset');
  var formSelects = form.querySelectorAll('select');
  var formInputs = form.querySelectorAll('input');
  var formButtons = form.querySelectorAll('button');

  removeDisabledAttribute(formFieldsets);
  removeDisabledAttribute(formSelects);
  removeDisabledAttribute(formInputs);
  removeDisabledAttribute(formButtons);
};

var getRandomNumber = function (minValue, maxValue) {
  return Math.floor(Math.random() * (maxValue - minValue + 1) + minValue);
};

var getRandomArrayElement = function (arr) {
  var max = arr.length - 1;
  var min = 0;

  return arr[Math.floor(Math.random() * (max - min + 1) + min)];
};

var getMinPriceValue = function () {
  var minPriceValue = 0;
  var adHousingTypeField = document.getElementById('type');
  minPriceValue = apartmentPriceByKey[adHousingTypeField.value];
  return minPriceValue;
};


var getRandomLengthArray = function (arr) {
  return arr.slice(0, getRandomNumber(1, arr.length));
};

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

var setActiveFormCondition = function (form) {
  removeDisabledFormElements(form);
  checkInputPriceValidity();
  setActiveAddress();
};

// Проверки

var checkInputPriceValidity = function () {
  var adPriceField = document.getElementById('price');
  var priceField = adPriceField;

  if (priceField.value < getMinPriceValue() || priceField.value > MAX_PRICE_VALUE) {
    priceField.setCustomValidity('Цена не может быть ниже ' +
      getMinPriceValue() + ' и выше чем ' + MAX_PRICE_VALUE + '.');
  } else {
    priceField.setCustomValidity('');
  }
};

var checkRoomGuestsValidity = function () {
  var adGuestsQuantityField = document.getElementById('capacity');
  var adRoomQuantityField = document.getElementById('room_number');
  var target = adGuestsQuantityField;
  var guests = parseInt(target.value, 10);

  switch (adRoomQuantityField.value) {
    case '1':
      if (guests > 1 || guests === 0) {
        target.setCustomValidity('Гостей должно быть не больше одного.');
      } else {
        target.setCustomValidity('');
      }
      break;
    case '2':
      if (guests > 2 || guests === 0) {
        target.setCustomValidity('Гостей должно быть не больше двух.');
      } else {
        target.setCustomValidity('');
      }
      break;
    case '3':
      if (guests > 3 || guests === 0) {
        target.setCustomValidity('Гостей должно быть не больше трех.');
      } else {
        target.setCustomValidity('');
      }
      break;
    case '100':
      if (guests !== 0) {
        target.setCustomValidity('Подходит только для "не гостей"');
      } else {
        target.setCustomValidity('');
      }
      break;

    default:
      target.setCustomValidity('');
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
  var roomString = getNumEnding(currentRoomsValue, pluralForms);

  cardAvatar.src = object.author.avatar;
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

  return cardElement;
};


// ф-ция отрисовки пинов на карте.

var renderPins = function (objects) {
  var fragment = document.createDocumentFragment();

  var pins = getPins(objects);
  for (var i = 0; i < pins.length; i++) {
    fragment.appendChild(pins[i]);
    mapPins.appendChild(fragment);
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

// События
var onEscPressClosePopup = function (evt) {
  var popup = document.querySelector('.popup');
  if (evt.key === ESC_KEY) {
    popup.remove();
    document.removeEventListener('keydown', onEscPressClosePopup);
  }
};

var onInputPriceValidity = function () {
  checkInputPriceValidity();
};

var onChangesGuestsQuantity = function () {
  checkRoomGuestsValidity();
};

var onChangesHousingType = function () {
  var adPriceField = document.getElementById('price');
  var adHousingTypeField = document.getElementById('type');

  checkInputPriceValidity();

  adPriceField.placeholder = apartmentPriceByKey[adHousingTypeField.value];
  adPriceField.setAttribute('required', 'required');
  adPriceField.setAttribute('min', apartmentPriceByKey[adHousingTypeField.value]);
  onInputPriceValidity();
};

var onChangesTimeInField = function () {
  var adTimeInField = document.getElementById('timein');
  var adTimeOutField = document.getElementById('timeout');
  adTimeOutField.selectedIndex = adTimeInField.selectedIndex;
};

var onChangesTimeOutField = function () {
  var adTimeInField = document.getElementById('timein');
  var adTimeOutField = document.getElementById('timeout');
  adTimeInField.selectedIndex = adTimeOutField.selectedIndex;
};

var onInputTitleValidity = function () {
  var adTitleField = document.getElementById('title');
  var target = adTitleField;
  if (target.value.length < MIN_TITLE_LENGTH || target.value.length > MAX_TITLE_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' +
      MIN_TITLE_LENGTH +
        ' и максимум из ' + MAX_TITLE_LENGTH + ' символов.');
  } else {
    target.setCustomValidity('');
  }
};

var onFormChange = function () {
  var adPriceField = document.getElementById('price');
  var adRoomQuantityField = document.getElementById('room_number');
  var adGuestsQuantityField = document.getElementById('capacity');
  var adTitleField = document.getElementById('title');
  var adHousingTypeField = document.getElementById('type');
  var adTimeInField = document.getElementById('timein');
  var adTimeOutField = document.getElementById('timeout');

  adPriceField.addEventListener('input', onInputPriceValidity);
  adRoomQuantityField.addEventListener('change', onChangesGuestsQuantity);
  adGuestsQuantityField.addEventListener('change', onChangesGuestsQuantity);
  adHousingTypeField.addEventListener('change', onChangesHousingType);
  adTimeOutField.addEventListener('change', onChangesTimeOutField);
  adTimeInField.addEventListener('change', onChangesTimeInField);
  adTitleField.addEventListener('input', onInputTitleValidity);
  adPriceField.addEventListener('input', onInputPriceValidity);
};

var onPinLeftMouseClick = function (evt) {
  var currentPin = evt.target;
  evt.currentTarget.removeEventListener('keydown', onPinEnterPress);
  var imgSrc = currentPin.getAttribute('src');
  var currentObjectIndex = parseInt((imgSrc.substr(-6, 2)), 10);
  var currentCard = getAdCardElement(adsObjects[currentObjectIndex - 1]);
  var oldCard = document.querySelector('.map__card');
  if (document.contains(oldCard)) {
    oldCard.remove();
    renderCard(currentCard);
  } else {
    renderCard(currentCard);
  }

  document.addEventListener('keydown', onEscPressClosePopup);
};

var onPinEnterPress = function (evt) {
  if (evt.key === ENTER_KEY) {
    var currentPin = evt.target;
    evt.currentTarget.removeEventListener('click', onPinLeftMouseClick);
    var buttonImage = currentPin.querySelector('img');
    var imgSrc = buttonImage.getAttribute('src');
    var currentObjectIndex = parseInt((imgSrc.substr(-6, 2)), 10);
    var currentCard = getAdCardElement(adsObjects[currentObjectIndex - 1]);
    var oldCard = document.querySelector('.map__card');
    if (document.contains(oldCard)) {
      oldCard.remove();
      renderCard(currentCard);
    } else {
      renderCard(currentCard);
    }
    document.addEventListener('keydown', onEscPressClosePopup);
  }
};

var onMainPinLeftMouseClick = function (evt) {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  if (evt.which === 1) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setActiveFormCondition(adForm);
    adForm.addEventListener('change', onFormChange);
    // отрисовываем пины на карте.
    renderPins(adsObjects);
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].addEventListener('click', onPinLeftMouseClick);
      pins[i].addEventListener('keydown', onPinEnterPress);
    }
    pinMain.removeEventListener('keydown', onMainPinEnterPress);
  }
};

var onMainPinEnterPress = function (evt) {
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');

  if (evt.key === ENTER_KEY) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    setActiveFormCondition(adForm);
    adForm.addEventListener('change', onFormChange);
    // отрисовываем пины на карте.
    renderPins(adsObjects);
    var pins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
    for (var i = 0; i < pins.length; i++) {
      pins[i].addEventListener('click', onPinLeftMouseClick);
      pins[i].addEventListener('keydown', onPinEnterPress);
    }
    pinMain.removeEventListener('click', onMainPinLeftMouseClick);
  }
};
// События после загрузки.

var adForm = document.querySelector('.ad-form');

setImageAttribute();
setDisabledFormElements(adForm);
setNonActiveAddress();

// Переход в активный режим, прослушка событий.

var pinMain = document.querySelector('.map__pin--main');

pinMain.addEventListener('click', onMainPinLeftMouseClick);
pinMain.addEventListener('keydown', onMainPinEnterPress);

var mapPins = document.querySelector('.map__pins');

// Получаем массив с объектами инф-ции о пинах.
var adsObjects = getAdObjects();
