'use strict';

(function () {

  var templateCard = document.querySelector('#card').content.querySelector('.map__card');
  var ROOMS_FORMS = ['комната', 'комнаты', 'комнат'];
  var GUESTS_FORMS = ['гостя', 'гостей', 'гостей'];

  var FeaturesClassMap = {
    wifi: 'popup__feature--wifi',
    dishwasher: 'popup__feature--dishwasher',
    parking: 'popup__feature--parking',
    washer: 'popup__feature--washer',
    elevator: 'popup__feature--elevator',
    conditioner: 'popup__feature--conditioner'
  };

  var TypesMap = {
    'palace': 'Дворец',
    'flat': 'Квартира',
    'house': 'Дом',
    'bungalo': 'Бунгало'
  };

  var renderAdFeatures = function (ad, featuresNode) {
    var currentFeatures = ad.offer.features;

    var features = Array.from(featuresNode.children);
    features.forEach(function (item, index) {
      if (index >= currentFeatures.length) {
        featuresNode.removeChild(item);
      }
      item.className = '';
      item.classList.add('popup__feature', FeaturesClassMap[currentFeatures[index]]);
    });
  };

  var renderAdPhotos = function (ad, photosNode) {
    var currentPhotos = ad.offer.photos;
    var currentAdPhoto = photosNode.children[0];
    photosNode.innerHTML = '';
    var photosFragment = document.createDocumentFragment();
    currentPhotos.forEach(function (item) {
      var tempAdPhoto = currentAdPhoto.cloneNode(true);
      tempAdPhoto.src = item;
      photosFragment.appendChild(tempAdPhoto);
    });
    photosNode.appendChild(photosFragment);
  };

  var renderAdCard = function (ad) {
    var adCard = templateCard.cloneNode(true);
    adCard.querySelector('.popup__avatar').src = ad.author.avatar;
    adCard.querySelector('.popup__title').textContent = ad.offer.title;
    adCard.querySelector('.popup__text--address').textContent = ad.offer.address;
    adCard.querySelector('.popup__text--price').textContent = ad.offer.price + '\u20bd/ночь.';
    adCard.querySelector('.popup__type').textContent = TypesMap[ad.offer.type];
    adCard.querySelector('.popup__text--time').textContent = 'Заезд после ' +
      ad.offer.checkin + ', выезд до ' + ad.offer.checkout;

    var roomsNounForm = window.util.getNounForms(ad.offer.rooms, ROOMS_FORMS);
    var guestsNounForm = window.util.getNounForms(ad.offer.guests, GUESTS_FORMS);
    adCard.querySelector('.popup__text--capacity').textContent = ad.offer.rooms + ' ' +
      roomsNounForm + ' для ' + ad.offer.guests + ' ' + guestsNounForm;

    var adCardDescription = adCard.querySelector('.popup__description');
    if (!ad.offer.description) {
      adCard.removeChild(adCardDescription);
    } else {
      adCardDescription.textContent = ad.offer.description;
    }

    var adCardFeatures = adCard.querySelector('.popup__features');

    if (ad.offer.features.length) {
      renderAdFeatures(ad, adCardFeatures);
    } else {
      adCard.removeChild(adCardFeatures);
    }

    var adCardPhotos = adCard.querySelector('.popup__photos');
    if (ad.offer.photos.length) {
      renderAdPhotos(ad, adCardPhotos);
    } else {
      adCard.removeChild(adCardPhotos);
    }

    return adCard;
  };

  var removeCard = function () {
    var mapCard = window.util.map.querySelector('.map__card');
    if (mapCard) {
      document.removeEventListener('keydown', removeCardKeydownHandler);
      mapCard.remove();
    }
  };

  var removeCardKeydownHandler = function (evt) {
    if (evt.keyCode === window.util.ESC_KEYCODE) {
      window.card.removeCard();
    }
  };

  var filtersContainer = document.querySelector('.map__filters-container');

  var showCard = function (item) {
    window.card.removeCard();
    var adFragment = document.createDocumentFragment();
    adFragment.appendChild(renderAdCard(item));
    window.util.map.insertBefore(adFragment, filtersContainer);
    window.util.map.querySelector('.popup__close').addEventListener('click', window.card.removeCard);
    document.addEventListener('keydown', removeCardKeydownHandler);
  };

  window.card = {
    removeCard: removeCard,
    showCard: showCard
  };
})();
