(function() {
  'use strict';

  angular
    .module('BG')
    .config(config);

  /** @ngInject */
  function config($logProvider,$translateProvider,$httpProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: '/app/i18n/',
      suffix: '.json'
    });

    $httpProvider.interceptors.push(function($rootScope,API) {
      var counter=0;
      return {
        'request': function(config) {

          if(config.url.indexOf(API.baseURL)==0){
            counter++;
            $rootScope.rmodel.loader=true;
          }
          if(localStorage.userToken){
            config.headers.AUTHORIZATION='Token '+localStorage.userToken
          }

          return config;
        },

        'response': function(response) {

          if(response.config && response.config.url.indexOf(API.baseURL)==0){

            counter--;
            if(counter<=0){
              $rootScope.rmodel.loader=false;
            }

          }
          return response;
        },
        'responseError': function(response) {
          if(response.config && response.config.url.indexOf(API.baseURL)==0){

            counter--;
            if(counter<=0){
              $rootScope.rmodel.loader=false;
            }

          }
          return response;
        }
      };
    });
  }

})();
