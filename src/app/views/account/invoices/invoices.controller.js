angular.module('BG').controller('InvoicesCtrl',
  /** @ngInject */
    function ($scope, $state, InvoicesService) {
    var invoicesMdl = $scope.invoicesMdl = {};
    invoicesMdl.test="welcome";
    invoicesMdl.pay=function(invoice){
      $state.go('main.payment',{invoiceId:invoice.id});
    }


  });