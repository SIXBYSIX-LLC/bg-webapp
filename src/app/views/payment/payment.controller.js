angular.module('BG')
  .constant('clientTokenPath','DUMMY')
  .controller('PaymentCtrl',

  /** @ngInject */
    function ($scope, $state, $braintree, InvoicesService, PaymentService, $stateParams, $http) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoice($stateParams.invoiceId).then(function(response){
      mdl.invoice=response.data.data;
    });

    $scope.creditCard = {
      number: '',
      expirationDate: ''
    };

    var client;


    $scope.$on("$viewContentLoaded",function(){
      PaymentService.getToken().then(function(response){
        var token=response.data.data.client_token;
        client = new $braintree.api.Client({
          clientToken: token
        });
      });

    });

    $scope.payButtonClicked=function(){
      client.tokenizeCard({
        number: $scope.creditCard.number,
        expirationDate: $scope.creditCard.expirationDate
      }, function (err, nonce) {
          PaymentService.payInvoice($stateParams.invoiceId,nonce).then(function(){
            $state.go("main.account.invoices.list");
          });
      });
    };




  });
