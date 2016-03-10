angular.module('BG').controller('ListOrdersCtrl',
  /** @ngInject */
    function ($scope, OrdersService) {
    var mdl = $scope.mdl = {};
    OrdersService.getOrders().then(function(response){
      mdl.orders=response.data.data;
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