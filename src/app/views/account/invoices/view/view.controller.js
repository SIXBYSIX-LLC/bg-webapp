angular.module('BG').controller('ViewInvoiceCtrl',
  /** @ngInject */
    function ($scope, InvoicesService, $stateParams) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoice($stateParams.id).then(function(response){
      mdl.invoice=response.data.data;
    });


  });