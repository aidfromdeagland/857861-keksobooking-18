'use strict';

(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var adImagesChooser = document.querySelector('#images');
  var avatarPreview = document.querySelector('.ad-form-header__preview');
  var adImagesPreview = document.querySelector('.ad-form__photo');

  var provideImagesLoading = function (input, previewElement) {

    input.addEventListener('change', function () {
      var file = input.files[0];
      var fileName = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (it) {
        return fileName.endsWith(it);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          if (!previewElement.querySelector('img')) {
            var createdImage = document.createElement('img');
            previewElement.style.padding = '0 15px';
            createdImage.width = '40';
            createdImage.height = '70';
            createdImage.alt = 'Фотография';

            previewElement.appendChild(createdImage);
          }

          previewElement.querySelector('img').src = reader.result;
        });

        reader.readAsDataURL(file);
      }
    });
  };

  provideImagesLoading(avatarChooser, avatarPreview);
  provideImagesLoading(adImagesChooser, adImagesPreview);

})();
