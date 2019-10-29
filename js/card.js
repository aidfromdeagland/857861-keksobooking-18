'use strict';

(function () {

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var ROOMS_FORMS = ['комната', 'комнаты', 'комнат'];
  var GUESTS_FORMS = ['гостя', 'гостей', 'гостей'];

  var TypesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var renderAdFeatures = function (ad, featuresNode) {
    var currentFeatures = ad['offer']['features'];
    var featuresArray = Array.from(featuresNode.children);
    featuresArray.forEach(function (item, index) {
      if (index >= currentFeatures.length) {
        featuresNode.removeChild(item);
      }
      item.textContent = currentFeatures[index];
    });
  };

  var renderAdPhotos = function (ad, photosNode) {
    var currentPhotos = ad['offer']['photos'];
    var currentAdPhoto = photosNode.children[0];
    photosNode.innerHTML = '';
    var photosFragment = document.createDocumentFragment();
    currentPhotos.forEach(function (item, index) {
      var tempAdPhoto = currentAdPhoto.cloneNode(true);
      tempAdPhoto.src = currentPhotos[index];
      photosFragment.appendChild(tempAdPhoto);
    });
    photosNode.appendChild(photosFragment);
  };

  var renderAdCard = function (ad) {
    var adCard = templateCard.cloneNode(true);
    adCard.querySelector('.popup__avatar').src = ad['author']['avatar'];
    adCard.querySelector('.popup__title').textContent = ad['offer']['title'];
    adCard.querySelector('.popup__text--address').textContent = ad['offer']['address'];
    adCard.querySelector('.popup__text--price').textContent = ad['offer']['price'] + '\u20bd/ночь.';
    adCard.querySelector('.popup__type').textContent = TypesMap[ad['offer']['type']];
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' +
      ad['offer']['checkin'] + ', выезд до ' + ad['offer']['checkout'];

    var roomsNounForm = window.util.getNounForms(ad['offer']['rooms'], ROOMS_FORMS);
    var guestsNounForm = window.util.getNounForms(ad['offer']['guests'], GUESTS_FORMS);
    adCard.querySelector('.popup__text--capacity').textContent = ad['offer']['rooms'] + ' ' +
      roomsNounForm + ' для ' + ad['offer']['guests'] + ' ' + guestsNounForm;

    var adCardDescription = adCard.querySelector('.popup__description');
    if (!ad['offer']['description']) {
      adCard.removeChild(adCardDescription);
    } else {
      adCardDescription.textContent = ad['offer']['description'];
    }

    var adCardFeatures = adCard.querySelector('.popup__features');
    if (ad['offer']['features'].length) {
      renderAdFeatures(ad, adCardFeatures);
    } else {
      adCard.removeChild(adCardFeatures);
    }

    var adCardPhotos = adCard.querySelector('.popup__photos');
    if (ad['offer']['photos'].length) {
      renderAdPhotos(ad, adCardPhotos);
    } else {
      adCard.removeChild(adCardPhotos);
    }

    return adCard;
  };

  var removeCard = function () {
    var mapCard = window.util.map.querySelector('.map__card');
    if (mapCard) {
      mapCard.remove();
    }
  };

  var removeCardKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.card.removeCard();
    }
  };

  var showCard = function (cardNumber, loadedData) {
    window.card.removeCard();
    var adFragment = document.createDocumentFragment();
    adFragment.appendChild(renderAdCard(loadedData[cardNumber]));
    window.util.map.insertBefore(adFragment, window.filter.mapFiltersContainer);
    window.util.map.querySelector('.popup__close').addEventListener('click', window.card.removeCard);
  };

  window.card = {
    renderAdCard: renderAdCard,
    removeCard: removeCard,
    removeCardKeydownHandler: removeCardKeydownHandler,
    showCard: showCard
  };
})();
