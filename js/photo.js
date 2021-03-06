'use strict';

(function () {

  var preview = document.querySelector('.ad-form-header__preview img');
  var adPhoto = document.querySelector('.ad-form__photo');
  var fileChooserAvatar = document.querySelector('#avatar');
  var fileChooserImages = document.querySelector('#images');

  fileChooserAvatar.addEventListener('change', window.events.onFileChooserAvatar);
  fileChooserImages.addEventListener('change', window.events.onFileChooserImages);

  window.photo = {
    fileChooserAvatar: fileChooserAvatar,
    fileChooserImages: fileChooserImages,
    preview: preview,
    adPhoto: adPhoto
  };
})();
