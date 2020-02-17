'use strict';

(function () {

  var getFilteredData = function (data) {
    var housingTypeElement = document.getElementById('housing-type');
    var housingPriceElement = document.getElementById('housing-price');
    var housingRoomsElement = document.getElementById('housing-rooms');
    var housingGuestsElement = document.getElementById('housing-guests');
    var housingWifiElement = document.getElementById('filter-wifi');
    var housingDishwasherElement = document.getElementById('filter-dishwasher');
    var housingParkingElement = document.getElementById('filter-parking');
    var housingWasherElement = document.getElementById('filter-washer');
    var housingElevatorElement = document.getElementById('filter-elevator');
    var housingConditionerElement = document.getElementById('filter-conditioner');

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
          return it.offer.price < 10000;
        });
        break;
      case ('middle'):
        sameData = sameData.filter(function (it) {
          return (it.offer.price >= 10000 && it.offer.price <= 50000);
        });
        break;
      case ('high'):
        sameData = sameData.filter(function (it) {
          return it.offer.price > 50000;
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

    if (housingWifiElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('wifi');
      });
    }

    if (housingWifiElement.checked) {
      sameData = sameData.filter(function (it) {
        return it.offer.features.includes('wifi');
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
    getFilteredData: getFilteredData
  };
})();
