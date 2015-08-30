angular.module('BG')
  .controller('PaymentCtrl',

  /** @ngInject */
    function ($scope, $state, $braintree, InvoicesService, PaymentService, $stateParams, $http) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoice($stateParams.invoiceId).then(function (response) {
      mdl.invoice = response.data.data;
    });

    mdl.options={
      paymentMethodNonceReceived:function(event,nonce){
        PaymentService.payInvoice($stateParams.invoiceId, nonce).then(function () {
          $state.go("main.account.invoices.list");
        });
      },
      onError:function(error,message){
        $scope.$emit("BG:System:TopMessage", {
          text: msg,
          type: response.data.error ? 'error' : 'help'});
      }
    };

    mdl.pay=function(){
      return false;
    }



  });
