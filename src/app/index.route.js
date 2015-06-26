(function() {
  'use strict';

  angular
    .module('BG')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('app',{
        abstract:true,
        views:{
          header:{
            templateUrl:'app/components/header/header.html'
          }
        }
      })
      .state('app.home', {
        url: '/',
        views:{
          "main@":{
            templateUrl:'app/main/main.html'
          }
        }
      });

    $urlRouterProvider.otherwise('/');
  }

})();
