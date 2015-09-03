angular.module('BG').controller('ListSellerOrdersCtrl',
  /** @ngInject */
    function ($scope, SellerOrdersService) {

      var mdl = $scope.mdl = {};

      SellerOrdersService.getOrders().then(function (response) {
        mdl.orders = response.data.data;
      });

  });