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
        abstract:true,
        templateUrl:'app/views/account/equipments/equipments.html',
        controller:'EquipmentsCtrl'
      })
      .state('main.account.equipments.list',{
        url:'/list',
        templateUrl:'app/views/account/equipments/list/list.html',
        controller:'ListEquipmentsCtrl'
      })
      .state('main.account.equipments.add',{
        url:'/add',
        templateUrl:'app/views/account/equipments/add/add.html',
        controller:'AddEquipmentCtrl'
      })
      .state('main.account.favourites',{
        url:'/favourites',
        templateUrl:'app/views/account/favourites/favourites.html'
      })
      .state('main.account.jobsites',{
        url:'/jobsites',
        templateUrl:'app/views/account/jobsites/jobsites.html'
      })
      .state('main.account.jobsites.add',{
        url:'/add',
        templateUrl:'app/views/account/jobsites/add/add.html',
        controller:'AddJobsiteCtrl'
      })
      .state('main.account.jobsites.list',{
        url:'/list',
        templateUrl:'app/views/account/jobsites/list/list.html',
        controller:'ListJobsitesCtrl'
      })
      .state('main.account.profile',{
        abstract:true,
        url:'/profile',
        templateUrl:'app/views/account/profile/profile.html',
        controller:'ProfileCtrl'
      })
      .state('main.account.profile.edit',{
        url:'/edit',
        templateUrl:'app/views/account/profile/edit/edit.html',
        controller:'EditProfileCtrl'
      })
      .state('main.account.profile.view',{
        url:'/view',
        templateUrl:'app/views/account/profile/view/view.html',
        controller:'ViewProfileCtrl'
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
      })
      .state('main.cart',{
        url:'/cart/{id}',
        templateUrl:'app/views/cart/cart.html',
        controller:'CartCtrl'
      });



    $urlRouterProvider.otherwise('/');
  }

})();
