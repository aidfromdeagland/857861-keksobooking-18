'use strict';

(function () {
  var DEBOUNCE_DELAY = 500;
  var filterForm = document.querySelector('.map__filters');
  var filterFormType = document.querySelector('#housing-type');
  var filterFormPrice = document.querySelector('#housing-price');
  var filterFormRooms = document.querySelector('#housing-rooms');
  var filterFormGuests = document.querySelector('#housing-guests');
  var filterFormFeatures = document.querySelector('#housing-features');

  var FilterPriceMap = {
    'low': {
      MIN: 0,
      MAX: 10000
    },
    'middle': {
      MIN: 10000,
      MAX: 50000
    },
    'high': {
      MIN: 50000,
      MAX: 9999999
    }
  };

  var filterSelect = function (input, item, prop) {
    return input.value !== 'any' ?
      item.offer[prop].toString() === input.value
      : true;
  };

  var filterPrice = function (input, item) {
    return input.value !== 'any' ?
      item.offer.price >= FilterPriceMap[input.value].MIN &&
      item.offer.price < FilterPriceMap[input.value].MAX
      : true;
  };

  var filterFeatures = function (item) {
    var checkedFeatures = Array.from(filterFormFeatures.querySelectorAll('input[type="checkbox"]:checked'));

    return checkedFeatures.length === 0 ?
      true
      : checkedFeatures.every(function (element) {
        return item.offer.features.indexOf(element.value) !== -1;
      });
  };

  var filterFormTotally = window.util.debounce(function () {
    var filteredData = window.loadedData.slice();

    filteredData = filteredData.filter(function (item) {
      return filterSelect(filterFormType, item, 'type') &&
      filterSelect(filterFormRooms, item, 'rooms') &&
      filterSelect(filterFormGuests, item, 'guests') &&
      filterPrice(filterFormPrice, item) &&
      filterFeatures(item);
    });

    window.card.remove();
    window.map.deletePins();
    window.map.drawPins(filteredData);
  }, DEBOUNCE_DELAY);

  filterForm.addEventListener('change', filterFormTotally);

})();
