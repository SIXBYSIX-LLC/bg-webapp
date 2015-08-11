angular.module('BG').controller('ListInvoicesCtrl',
  /** @ngInject */
    function ($scope, InvoicesService) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoices().then(function(response){
      mdl.invoices=response.data.data;
    });


  });