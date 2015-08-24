angular.module('BG').controller('PaymentCtrl',

  /** @ngInject */
    function ($scope, InvoicesService, $stateParams) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoice($stateParams.invoiceId).then(function(response){
      mdl.invoice=response.data.data;
    });


  });
