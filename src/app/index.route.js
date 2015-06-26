(function() {
  'use strict';

  angular
    .module('BG')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main',{
          views:{
            "@": { templateUrl:'app/main/main.html' },
            "top@main": { templateUrl:'app/components/header/header.html' },
            "search@main": { templateUrl:'app/components/search-bar/search-bar.html' }
          }
      })
      .state('main.account',{
        url:'/account',
        templateUrl:'app/account/account.html'
      })
      .state('main.account.dashboard',{
        url:'/dashboard',
        templateUrl:'app/account/dashboard/dashboard.html'
      })
      .state('main.account.equipments',{
        url:'/equipments',
        templateUrl:'app/account/equipments/equipments.html'
      });

    $urlRouterProvider.otherwise('/account/equipments');
  }

})();
