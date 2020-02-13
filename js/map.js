'use strict';

(function () {

  var pinMain = document.querySelector('.map__pin--main');

  window.form.setDisabledFormCondition();

  pinMain.addEventListener('mousedown', window.drag.onMainPinMouseDown);
  pinMain.addEventListener('click', window.events.onMainPinLeftMouseClick);

})();
