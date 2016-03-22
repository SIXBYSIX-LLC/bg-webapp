angular.module('BG').controller('InvoicesCtrl',
  /** @ngInject */
    function ($scope, $state, InvoicesService) {
    var invoicesMdl = $scope.invoicesMdl = {};
    $scope.addBreadcrumb({title: "Invoices",state:"main.account.invoices.list"});
    $scope.$on("$stateChangeStart", function () {

      $scope.popBreadcrumb();
    });
    $scope.disableBreadcrumb(false);
    invoicesMdl.test="welcome";
    invoicesMdl.pay=function(invoice){
      $state.go('main.payment',{invoiceId:invoice.id});
    }


  });
