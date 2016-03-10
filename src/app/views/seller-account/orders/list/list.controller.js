angular.module('BG').controller('ListSellerOrdersCtrl',
  /** @ngInject */
    function ($scope, SellerOrdersService) {

      var mdl = $scope.mdl = {};

      $scope.searchOpen = false;
      $scope.filterOpen = false;

      SellerOrdersService.getOrders().then(function (response) {
        mdl.orders = response.data.data;
      });

      $scope.searchBar = function() {
      	$scope.searchOpen = !$scope.searchOpen;
      }

      $scope.filterBar = function() {
      	$scope.filterOpen = !$scope.filterOpen;
      }

  });