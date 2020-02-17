'use strict';

(function () {

  var onEscPressClosePopup = function (evt) {
    var popup = document.querySelector('.popup');
    if (evt.key === window.util.ESC_KEY) {
      popup.remove();
    }
    document.removeEventListener('keydown', onEscPressClosePopup);
  };

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
    var roomString = window.util.getNumEnding(currentRoomsValue, window.data.pluralForms);


    cardAvatar.src = object.author.avatar;
    cardTitle.textContent = object.offer.title;
    cardAddress.textContent = object.offer.address;
    cardPrice.textContent = object.offer.price + '₽/ночь';
    cardApartmentsType.textContent = window.data.apartmentNamesByKey[object.offer.type];
    cardCapacity.textContent = currentRoomsValue + ' ' + roomString + ' '
    + object.offer.guests + guestsSting;
    cardCheckTime.textContent = 'Заезд после ' + object.offer.checkin + ' выезд до ' + object.offer.checkout;
    cardDescription.textContent = object.offer.description;

    if (object.offer.photos.length === 0) {
      window.util.removeAllChildren(cardPhotos);

    } else if (object.offer.photos.length <= 1) {
      cardPhotoImg.src = object.offer.photos;

    } else {
      window.util.removeAllChildren(cardPhotos);

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

    window.util.removeAllChildren(cardFeaturesList);

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


  var removeAdCardElement = function () {
    var oldCard = document.querySelector('.popup');
    if (document.contains(oldCard)) {
      oldCard.remove();
    }
  };

  window.card = {
    getAdCardElement: getAdCardElement,
    removeAdCardElement: removeAdCardElement
  };
})();
