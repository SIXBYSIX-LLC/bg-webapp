angular.module('BG').controller('ViewOrderCtrl',
  /** @ngInject */
    function ($scope, OrdersService, $stateParams) {
    var mdl = $scope.mdl = {};
    OrdersService.getOrder($stateParams.id).then(function(response){
      mdl.order=response.data.data;
    });


  });