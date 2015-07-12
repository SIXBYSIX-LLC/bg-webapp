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
          templateUrl:'app/views/main/main.html',
          controller:"MainController"
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
      })
      .state('main.equiDetails',{
        url:'/equipment/{id}',
        templateUrl:'app/views/equi-details/equi-details.html',
        controller:'EquiDetailsCtrl'
      });



    $urlRouterProvider.otherwise('/');
  }

})();
