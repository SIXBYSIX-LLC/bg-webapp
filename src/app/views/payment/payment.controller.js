angular.module('BG')
  .controller('PaymentCtrl',

  /** @ngInject */
    function ($scope, $state,$q, $braintree, InvoicesService, PaymentService, $stateParams, $http, JobsitesService, CartService) {
    var mdl = $scope.mdl = {};
    console.log("$stateParams.invoiceId",$stateParams.invoiceId)
    InvoicesService.getInvoice($stateParams.invoiceId).then(function (response) {
      mdl.invoice = response.data.data;
    });
    $scope.disableBreadcrumb(true);
    mdl.options={
      paymentMethodNonceReceived:function(event,nonce){
        console.log("Payment Method",nonce);
        PaymentService.payInvoice($stateParams.invoiceId, nonce).then(function () {
          $scope.$emit("BG:System:TopMessage", {
            text: "Payment Successful",
            });

          $state.go("main.orderConfirmation");
        });
      },
      onError:function(error,message){
        $scope.$emit("BG:System:TopMessage", {
          text: message,
          type: response.data.error ? 'error' : 'help'});
      }
    };

    mdl.pay=function(){
      return false;
    }


    mdl.kinds = {
      "job_site": "Job site",
      "billing": "Billing"
    };
    mdl.shipping = {data: {
      kind: 'job_site',
      country: "6252001"
    }};
    mdl.billing = {data: {
      kind: 'billing',
      country: "6252001"
    }};
    mdl.termsAccepted = false;
    mdl.sameAsShipping = false;
    mdl.sites = [];

    var currentCartId;
    JobsitesService.getAllSites($scope.user.id).then(function (response) {
      mdl.allSites = response.data.data;
    });

    CartService.getCurrent().then(function (response) {
      $scope.$broadcast("LI:Loading", false);
      if (response && response.data && response.data.data) {
        currentCartId = response.data.data.id;
        mdl.cartData = response.data.data;
        if (mdl.cartData.billing_address && mdl.cartData.location) {
          var promises;
          if (mdl.cartData.billing_address == mdl.cartData.location) {
            mdl.sameAsShipping = true;
            promises = [JobsitesService.getSite($scope.user.id, mdl.cartData.billing_address)];
          } else {
            promises = [JobsitesService.getSite($scope.user.id, mdl.cartData.billing_address),
              JobsitesService.getSite($scope.user.id, mdl.cartData.location)];
          }
          $q.all(promises).then(function (responses) {
            mdl.shipping.data = responses[0].data.data;
            if (mdl.cartData.billing_address == mdl.cartData.location) {
              mdl.billing.data = angular.copy(mdl.shipping.data);
            } else {
              mdl.billing.data = responses[1].data.data;
            }
            var data = mdl.shipping.data;
            data.country = "" + data.country.id;
            data.state = "" + data.state.id;
            data.city = "" + data.city.id;

            data = mdl.billing.data;
            data.country = "" + data.country.id;
            data.state = "" + data.state.id;
            data.city = "" + data.city.id;
          });

          mdl.selectedBilling = mdl.cartData.billing_address || "";
          mdl.selectedShipping = mdl.cartData.location || "";

        }
      }
    });



  });
