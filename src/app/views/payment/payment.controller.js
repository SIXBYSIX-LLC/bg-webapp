angular.module('BG')
  .controller('PaymentCtrl',

  /** @ngInject */
    function ($scope, $state, $braintree, InvoicesService, PaymentService, $stateParams, $http) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoice($stateParams.invoiceId).then(function (response) {
      mdl.invoice = response.data.data;
    });


    mdl.pay=function(){
      console.log(mdl.payment);
//      PaymentService.payInvoice($stateParams.invoiceId, nonce).then(function () {
//        $state.go("main.account.invoices.list");
//      });
    }



  });
