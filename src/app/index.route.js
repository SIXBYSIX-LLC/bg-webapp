(function() {
  'use strict';

  angular
    .module('BG')
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('home',{
         url:'/',
         templateUrl:'app/views/home/home.html',
         controller:'HomeCtrl'
      })
      .state('main',{
          views:{
            "@": { templateUrl:'app/views/main/main.html' },
            "header@main": {
              templateUrl:'app/components/header2/header2.html',
              controller:"HeaderCtrl"
            }
          }
      })
      .state('main.account',{
        url:'/account',
        templateUrl:'app/views/account/account.html'
      })
      .state('main.account.dashboard',{
        url:'/dashboard',
        templateUrl:'app/views/account/dashboard/dashboard.html'
      })
      .state('main.account.equipments',{
        url:'/equipments',
        templateUrl:'app/views/account/equipments/equipments.html'
      })
      .state('main.search',{
        url:'/search/{query:.*}',
        templateUrl:'app/views/search/search.html',
        controller:'SearchCtrl'
      });



    $urlRouterProvider.otherwise('/');
  }

})();
