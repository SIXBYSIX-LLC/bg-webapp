angular.module('BG').controller('SellerInvoiceViewCtrl',
  /** @ngInject */
    function ($scope,SellerInvoicesService,$stateParams) {

    var mdl = $scope.mdl = {};
    SellerInvoicesService.getInvoice($stateParams.id).then(function(response){
      mdl.item = response.data.data;
    });



  });