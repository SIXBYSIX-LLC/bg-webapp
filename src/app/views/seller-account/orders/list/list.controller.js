angular.module('BG').controller('ListSellerOrdersCtrl',
  /** @ngInject */
    function ($scope, SellerOrdersService) {

      var mdl = $scope.mdl = {};


      SellerOrdersService.getOrders().then(function (response) {
        mdl.orders = response.data.data;
      });

      $scope.searchOpen = false;
      $scope.filterOpen = false;
      $scope.searchBar = function() {
      	$scope.searchOpen = !$scope.searchOpen;
      }

      $scope.filterBar = function() {
      	$scope.filterOpen = !$scope.filterOpen;
      }

  });