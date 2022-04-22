"use strict";
new Vue({
  el: ".vue-app",
  data: {
    show: false,
    countryRegion: null,
    countryName: null,
    flag: null,
    countryPopulation: null,
    countryCurrency: null,
    countrySubregion: null,
    countryLanguage: null,
  },
  methods: {
    getStarted: function () {
      this.show = !this.show;
    },
    getCountryByCode: function (code) {
      fetch(`https://restcountries.com/v3.1/alpha/${code}`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data[0]);
          this.renderCountry(data);
          //   this.getStarted();
        });
    },
    tryThis: function () {
      fetch(` https://api.country.is`)
        .then((response) => response.json())
        .then((data) => {
          console.log(data.country);

          //   this.getCountryByCode(data.country);
          this.getCountryByCode("RU");
        });
    },
    renderCountry: function (dataObject) {
      const [data] = dataObject;
      this.flag = data.flags.svg;
      this.countryName = data.name.common;
      this.countryRegion = data.region;
      this.countrySubregion = data.subregion;
      this.countryLanguage = this.getLanguage(data.languages);
      this.countryCurrency = this.getCurrency(data.currencies);
      console.log(data.region);
    },

    getLanguage: function (languageObject) {
      return languageObject[Object.keys(languageObject)[0]];
    },

    getCurrency: function (currencyObject) {
      return Object.keys(currencyObject)[0];
    },
    calcPopulation: function (populationValue) {},
  },
});