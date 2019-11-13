'use strict';

(function () {
  var acceptedType = '.gif,.jpg,.jpeg,.png';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var avatarChooser = document.querySelector('#avatar');
  var adImagesChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var adImagesPreview = document.querySelector('.ad-form__photo');
  var photoContainer = document.querySelector('.ad-form__photo-container');
  var initialAvatarSrc = avatarPreview.querySelector('img').src;
  var adImagesPreviewAddedClass = 'ad-form__photo--added';

  avatarChooser.accept = acceptedType;
  adImagesChooser.accept = acceptedType;
  adImagesChooser.multiple = true;

  var removeLoadedImages = function () {

    if (avatarPreview.querySelector('img').src !== initialAvatarSrc) {
      avatarPreview.querySelector('img').src = initialAvatarSrc;
    }

    if (photoContainer.querySelector('.' + adImagesPreviewAddedClass)) {
      var addedPhotos = photoContainer.querySelectorAll('.' + adImagesPreviewAddedClass);
      addedPhotos.forEach(function (element) {
        element.remove();
      });
    }
  };

  var provideImagesLoading = function (input, previewElement) {
    var inputChangeHandler = function () {
      for (var i = 0; i < input.files.length; i++) {
        (function () {
          var file = input.files[i];
          var fileName = file.name.toLowerCase();

          var matches = FILE_TYPES.some(function (it) {
            return fileName.endsWith(it);
          });

          if (matches) {
            var reader = new FileReader();

            var readerLoadHandler = function () {
              if (input.multiple) {
                previewElement.style.padding = '15px';
                var clonedPreviewElement = previewElement.cloneNode();
                clonedPreviewElement.classList.add(adImagesPreviewAddedClass);

                var additionalImage = document.createElement('img');
                additionalImage.width = '40';
                additionalImage.height = '40';
                additionalImage.alt = 'Фотография жилья';
                additionalImage.src = reader.result;
                clonedPreviewElement.appendChild(additionalImage);
                photoContainer.insertBefore(clonedPreviewElement, previewElement);
              } else {
                previewElement.querySelector('img').src = reader.result;
              }
            };
            reader.addEventListener('load', readerLoadHandler);

            reader.readAsDataURL(file);
          }
        })();
      }
    };

    input.addEventListener('change', inputChangeHandler);
  };

  provideImagesLoading(avatarChooser, avatarPreview);
  provideImagesLoading(adImagesChooser, adImagesPreview);

  window.removeLoadedImages = removeLoadedImages;
})();
