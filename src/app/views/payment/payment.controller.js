angular.module('BG').controller('PaymentCtrl',

  /** @ngInject */
    function ($scope, InvoicesService, PaymentService, $stateParams) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoice($stateParams.invoiceId).then(function(response){
      mdl.invoice=response.data.data;
    });
    $scope.$on("$viewContentLoaded",function(){
      PaymentService.getToken().then(function(response){
        var token=response.data.data;
        var braintree = Braintree.create(token)
        braintree.onSubmitEncryptForm('braintree-payment-form');
      });

    });


  });
