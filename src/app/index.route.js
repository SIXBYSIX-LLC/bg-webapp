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
        abstract:true,
        controller:'AccountCtrl',
        templateUrl:'app/views/account/account.html'
      })
      .state('main.account.bookings',{
        url:'/bookings',
        templateUrl:'app/views/account/bookings/bookings.html'
      })
      .state('main.account.dashboard',{
        url:'/dashboard',
        templateUrl:'app/views/account/dashboard/dashboard.html'
      })
      .state('main.account.equipments',{
        url:'/equipments',
        templateUrl:'app/views/account/equipments/equipments.html'
      })
      .state('main.account.favourites',{
        url:'/favourites',
        templateUrl:'app/views/account/favourites/favourites.html'
      })
      .state('main.account.jobsites',{
        url:'/jobsites',
        templateUrl:'app/views/account/jobsites/jobsites.html'
      })
      .state('main.account.profile',{
        url:'/profile',
        templateUrl:'app/views/account/profile/profile.html',
        controller:'ProfileCtrl'
      })
      .state('main.account.requests',{
        url:'/requests',
        templateUrl:'app/views/account/requests/requests.html'
      })
      .state('main.account.settings',{
        url:'/settings',
        templateUrl:'app/views/account/settings/settings.html'
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
