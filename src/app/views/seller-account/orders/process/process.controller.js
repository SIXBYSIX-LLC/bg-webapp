angular.module('BG').controller('ProcessSellerOrderCtrl',
  /** @ngInject */
    function ($scope,$stateParams, SellerOrdersService) {

    var mdl = $scope.mdl = {};
    SellerOrdersService.getOrder($stateParams.id).then(function(response){
      mdl.order=response.data.data;
    });

    mdl.orderOptions=[{

    }]

  });