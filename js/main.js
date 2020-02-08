'use strict';

/*
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
*/

//


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

// Ф-ции настройки.

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

// Ф-ции "получалки" для работы с полями формы.

var getMinPriceValue = function () {
  var minPriceValue = 0;
  var adHousingTypeField = document.getElementById('type');
  minPriceValue = window.data.apartmentPriceByKey[adHousingTypeField.value];
  return minPriceValue;
};

var setInputFileAttribute = function () {
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

var setDisabledFormCondition = function (form) {
  setDisabledFormElements(form);
  setInputFileAttribute();
  checkAndSetInputAddress();
};

var setActiveFormCondition = function (form) {
  form.classList.remove('ad-form--disabled');
  removeDisabledFormElements(form);
  // Проверяем и устанавливаем поля формы.
  checkInputTitleValidity();
  checkAndSetInputAddress();
  checkHousingType();
  checkRoomGuestsValidity();
  setTimeFieldValue();
};

var setTimeFieldValue = function () {
  var adTimeInField = document.getElementById('timein');
  var adTimeOutField = document.getElementById('timeout');
  adTimeInField.onchange = function () {
    adTimeOutField.selectedIndex = this.selectedIndex;
  };
  adTimeOutField.onchange = function () {
    adTimeInField.selectedIndex = this.selectedIndex;
  };
};

//  Ф-ции проверок.

var checkInputTitleValidity = function () {
  var adTitleField = document.getElementById('title');
  var target = adTitleField;
  if (target.value.length < window.data.MIN_TITLE_LENGTH || target.value.length > window.data.MAX_TITLE_LENGTH) {
    target.setCustomValidity('Имя должно состоять минимум из ' +
      window.data.MIN_TITLE_LENGTH +
        ' и максимум из ' + window.data.MAX_TITLE_LENGTH + ' символов.');

  } else {
    target.setCustomValidity('');
  }
};

var checkAndSetInputAddress = function () {
  var adAddressField = document.getElementById('address');
  adAddressField.setAttribute('readonly', 'readonly');
  // Проверяем состояние формы и присваеваем значение полю адреса.
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var pinMainStyle = getComputedStyle(pinMain);
  var pinWidth = parseInt(pinMainStyle.width, 10);
  var pinHeight = parseInt(pinMainStyle.height, 10);
  var pinLeftСoordinate = parseInt(pinMainStyle.left, 10);
  var pinTopСoordinate = parseInt(pinMainStyle.top, 10);
  var addressСoordinateX = 0;
  var addressСoordinateY = 0;
  if (adForm.classList.contains('ad-form--disabled')) {
    addressСoordinateX = Math.floor(pinLeftСoordinate + pinWidth / 2);
    addressСoordinateY = Math.floor(pinTopСoordinate + pinHeight / 2);
  } else {
    addressСoordinateX = Math.floor(pinLeftСoordinate + pinWidth / 2);
    addressСoordinateY = Math.floor(pinTopСoordinate + pinHeight + 22);
  }
  var adAddressValue = addressСoordinateX + ', ' + addressСoordinateY;
  adAddressField.value = adAddressValue;
  adAddressField.value = adAddressValue;
};

var checkHousingType = function () {
  var adPriceField = document.getElementById('price');
  var adHousingTypeField = document.getElementById('type');

  checkInputPriceValidity();

  adPriceField.placeholder = window.data.apartmentPriceByKey[adHousingTypeField.value];
  adPriceField.setAttribute('required', 'required');
  adPriceField.setAttribute('min', window.data.apartmentPriceByKey[adHousingTypeField.value]);
};

var checkInputPriceValidity = function () {
  var adPriceField = document.getElementById('price');
  var priceField = adPriceField;

  if (priceField.value < getMinPriceValue() || priceField.value > window.data.MAX_PRICE_VALUE) {
    priceField.setCustomValidity('Цена не может быть ниже ' +
      getMinPriceValue() + ' и выше чем ' + window.data.MAX_PRICE_VALUE + '.');
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


var onInputTitleValidity = function () {
  checkInputTitleValidity();
};

var onChangesHousingType = function () {
  checkHousingType();
};

var onInputPriceValidity = function () {
  checkInputPriceValidity();
};

var onChangesGuestsQuantity = function () {
  checkRoomGuestsValidity();
};

var onChangesTime = function () {
  setTimeFieldValue();
};

var onFormChange = function () {
  var adPriceField = document.getElementById('price');
  var adRoomQuantityField = document.getElementById('room_number');
  var adGuestsQuantityField = document.getElementById('capacity');
  var adTitleField = document.getElementById('title');
  var adHousingTypeField = document.getElementById('type');
  var adTimeInField = document.getElementById('timein');
  var adTimeOutField = document.getElementById('timeout');

  adTitleField.addEventListener('input', onInputTitleValidity);
  adHousingTypeField.addEventListener('change', onChangesHousingType);
  adPriceField.addEventListener('input', onInputPriceValidity);
  adRoomQuantityField.addEventListener('change', onChangesGuestsQuantity);
  adGuestsQuantityField.addEventListener('change', onChangesGuestsQuantity);
  adTimeInField.addEventListener('change', onChangesTime);
  adTimeOutField.addEventListener('change', onChangesTime);
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
  var adForm = document.querySelector('.ad-form');

  if (evt.which === 1) {
    map.classList.remove('map--faded');
    // Активируем форму.
    setActiveFormCondition(adForm);
    adForm.addEventListener('change', onFormChange);
    // Получем массив данных пинов.
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

var adForm = document.querySelector('.ad-form');

setDisabledFormCondition(adForm);

// 2. Слушаем событие перехода в активный режим.

var pinMain = document.querySelector('.map__pin--main');

pinMain.addEventListener('click', onMainPinLeftMouseClick);

