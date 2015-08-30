angular.module('BG').controller('ListOrdersCtrl',
  /** @ngInject */
    function ($scope, OrdersService) {
    var mdl = $scope.mdl = {};
    OrdersService.getOrders().then(function(response){
      mdl.orders=response.data.data;
    });


  });