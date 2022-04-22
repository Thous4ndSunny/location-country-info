"use strict";
new Vue({
  el: ".vue-app",
  data: {
    showConvert: false,
    slide: false,
    show: false,
    countryRegion: null,
    countryName: null,
    flag: null,
    countryPopulation: null,
    countryCurrency: null,
    countrySubregion: null,
    countryLanguage: null,
    /*Conversion rates */
    conversionRateObject: null,
    conversionRatesArray: null,
    pickedCountry: "-",
    inputAmount: "",
    result: "-",
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
          this.getStarted();
        });
    },
    tryThis: function () {
      fetch(` https://api.country.is`)
        .then((response) => response.json())
        .then((data) => {
          //   console.log(data.country);

          this.getCountryByCode(data.country);
          //   this.getCountryByCode("GB");
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
      this.countryPopulation = this.calcPopulation(data.population);
      console.log(data.region);
    },

    getLanguage: function (languageObject) {
      return languageObject[Object.keys(languageObject)[0]];
    },

    getCurrency: function (currencyObject) {
      return Object.keys(currencyObject)[0];
    },
    calcPopulation: function (populationValue) {
      const value = Number(populationValue);
      if (value < 1000000) {
        return (value / 1000).toFixed(1) + " Thousand";
      } else if (value < 1000000000) {
        return (value / 1000000).toFixed(2) + " Milion";
      }
    },
    slideMe: function () {
      this.slide = !this.slide;
      this.showConvert = !this.showConvert;
      this.getConvValues();
    },
    /*Currency conversion */

    getConvValues: function () {
      fetch(
        `https://v6.exchangerate-api.com/v6/a338f9df71740d0a64e08a2d/latest/${this.countryCurrency}`
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data.conversion_rates);
          this.conversionRateObject = data.conversion_rates;
          this.conversionRatesArray = Object.keys(data.conversion_rates);

          console.log(this.conversionRatesArray);
          console.log(
            `ovo je ono kaj spremam ${this.conversionRateObject["EUR"]}`
          );
        });
    },
    convertCur: function () {
      this.result = (
        Number(this.inputAmount) *
        Number(this.conversionRateObject[this.pickedCountry])
      ).toFixed(2);
      console.log(this.conversionRateObject[this.pickedCountry]);
      console.log(` ovo je objekt ${this.conversionRateObject}`);
      console.log(` ovo je dryava ${this.pickedCountry}`);
    },
  },
});
