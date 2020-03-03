'use strict';

(function () {
  var LOW_PRICE = 10000;
  var HIGH_PRICE = 50000;

  var mapFilter = document.querySelector('.map__filters');

  var getFilteredData = function (data) {

    var housingTypeElement = mapFilter.querySelector('#housing-type');
    var housingPriceElement = mapFilter.querySelector('#housing-price');
    var housingRoomsElement = mapFilter.querySelector('#housing-rooms');
    var housingGuestsElement = mapFilter.querySelector('#housing-guests');
    var housingWifiElement = mapFilter.querySelector('#filter-wifi');
    var housingDishwasherElement = mapFilter.querySelector('#filter-dishwasher');
    var housingParkingElement = mapFilter.querySelector('#filter-parking');
    var housingWasherElement = mapFilter.querySelector('#filter-washer');
    var housingElevatorElement = mapFilter.querySelector('#filter-elevator');
    var housingConditionerElement = mapFilter.querySelector('#filter-conditioner');

    var housingType = housingTypeElement.value;
    var housingPrice = housingPriceElement.value;
    var housingRooms = housingRoomsElement.value;
    var housingGuests = housingGuestsElement.value;

    var sameData = data;

    if (housingType !== 'any') {
      sameData = sameData.filter(function (it) {
        return it.offer.type === housingType;
      });
    }

    switch (housingPrice) {
      case ('low'):
        sameData = sameData.filter(function (it) {
          return it.offer.price < LOW_PRICE;
        });
        break;
      case ('middle'):
        sameData = sameData.filter(function (it) {
          return (it.offer.price >= LOW_PRICE && it.offer.price <= HIGH_PRICE);
        });
        break;
      case ('high'):
        sameData = sameData.filter(function (it) {
          return it.offer.price > HIGH_PRICE;
        });
        break;
      case ('any'):
      default:
        sameData = sameData;
        break;
    }

    if (housingRooms === 'any') {
      sameData = sameData;
    } else {
      sameData = sameData.filter(function (it) {
        return it.offer.rooms === +housingRooms;
      });
    }

    if (housingGuests === 'any') {
      sameData = sameData;
    } else {
      sameData = sameData.filter(function (it) {
        return it.offer.guests === +housingGuests;
      });
    }

    if (housingWifiElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('wifi');
      });
    }

    if (housingDishwasherElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('dishwasher');
      });
    }

    if (housingParkingElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('parking');
      });
    }

    if (housingWasherElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('washer');
      });
    }

    if (housingElevatorElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('elevator');
      });
    }

    if (housingConditionerElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('conditioner');
      });
    }

    return sameData;
  };

  window.filter = {
    mapFilter: mapFilter,
    getFilteredData: getFilteredData
  };
})();
