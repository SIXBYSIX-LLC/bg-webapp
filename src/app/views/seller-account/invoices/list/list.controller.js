angular.module('BG').controller('SellerInvoiceListCtrl',
  /** @ngInject */
    function ($scope,SellerInvoicesService) {

    var mdl = $scope.mdl = {};
    SellerInvoicesService.getInvoices().then(function(response){
      mdl.items = response.data.data;
    });


  });