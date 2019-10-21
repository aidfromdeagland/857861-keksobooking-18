'use strict';

(function () {

  var filterForm = document.querySelector('.map__filters');
  var filterFormType = document.querySelector('#housing-type');
  var filterFormPrice = document.querySelector('#housing-price');
  var filterFormRooms = document.querySelector('#housing-rooms');
  var filterFormGuests = document.querySelector('#housing-guests');
  var filterFormFeatures = document.querySelector('#housing-features');

  var filterPriceMap = {
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
    if (input.value !== 'any') {
      return item['offer'][prop].toString() === input.value;
    } else {
      return true;
    }
  };

  var filterPrice = function (input, item) {
    if (input.value !== 'any') {
      return item['offer']['price'] >= filterPriceMap[input.value].MIN &&
      item['offer']['price'] < filterPriceMap[input.value].MAX;
    } else {
      return true;
    }
  };

  var filterFeatures = function (item) {
    var checkedFeatures = [];
    filterFormFeatures.querySelectorAll('input[type="checkbox"]:checked').forEach(function (element) {
      checkedFeatures.push(element.value);
    });

    if (checkedFeatures.length !== 0) {
      return checkedFeatures.every(function (element) {
        return item['offer']['features'].indexOf(element) !== -1;
      });
    } else {
      return true;
    }
  };

  var filterFormTotally = function () {
    var filteredData = window.loadedData.slice();

    filteredData = filteredData.filter(function (item) {
      return filterSelect(filterFormType, item, 'type');
    });

    filteredData = filteredData.filter(function (item) {
      return filterSelect(filterFormRooms, item, 'rooms');
    });

    filteredData = filteredData.filter(function (item) {
      return filterSelect(filterFormGuests, item, 'guests');
    });

    filteredData = filteredData.filter(function (item) {
      return filterPrice(filterFormPrice, item);
    });

    filteredData = filteredData.filter(function (item) {
      return filterFeatures(item);
    });

    window.map.deletePins();
    console.log(window.loadedData);
    console.log(filteredData);
    window.map.drawPins(filteredData);
  };

  filterForm.addEventListener('change', filterFormTotally);

})();
