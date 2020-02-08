'use strict';


var onMainPinLeftMouseClick = function (evt) {
  var map = document.querySelector('.map');

  if (evt.which === 1) {
    map.classList.remove('map--faded');
    // Активируем форму.
    window.form.setActiveFormCondition();
    window.form.adForm.addEventListener('change', window.form.onFormChange);
    // Получем массив данных пинов.

    var pinsForRend = window.pin.getPins();

    // Отображаем пины.
    console.log(pinsForRend);
  }
};


var pinMain = document.querySelector('.map__pin--main');

pinMain.addEventListener('click', onMainPinLeftMouseClick);
