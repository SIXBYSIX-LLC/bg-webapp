angular.module('BG').controller('CheckoutAddressCtrl',
  /** @ngInject */
    function ($scope, CartService, $timeout, $state, JobsitesService, SystemService, $q) {
    var mdl = $scope.mdl = {};
    mdl.kinds = {
      "job_site": "Job site",
      "billing": "Billing"
    };
    mdl.shipping = {data:{
      kind:'job_site',
      country:"6252001"
    }};
    mdl.billing = {data:{
      kind:'billing',
      country:"6252001"
    }};
    mdl.termsAccepted = false;
    mdl.sameAsShipping = false;

    var currentCartId;

    CartService.getCurrent().then(function (response) {
      $scope.$broadcast("LI:Loading",false);
      if (response && response.data && response.data.data) {
        currentCartId = response.data.data.id;
        mdl.cartData = response.data.data;
        if(mdl.cartData.billing_address && mdl.cartData.location){
          var promises;
          if(mdl.cartData.billing_address==mdl.cartData.location){
            promises=[JobsitesService.getSite($scope.user.id,mdl.cartData.billing_address)];
          }else{
            promises=[JobsitesService.getSite($scope.user.id,mdl.cartData.billing_address),
              JobsitesService.getSite($scope.user.id,mdl.cartData.location)];
          }
          $q.all(promises).then(function(responses){
            mdl.shipping.data=responses[0].data.data;
            if(mdl.cartData.billing_address==mdl.cartData.location){
              mdl.billing.data=angular.copy(mdl.shipping.data);
            }else{
              mdl.billing.data=responses[1].data.data;
            }
            var data=mdl.shipping.data;
            data.country = ""+data.country.id;
            data.state = ""+data.state.id;
            data.city = ""+data.city.id;

            data=mdl.billing.data;
            data.country = ""+data.country.id;
            data.state = ""+data.state.id;
            data.city = ""+data.city.id;
          });

        }
      }
    });

    $scope.$watch("mdl.sameAsShipping",function(newValue){
      if(newValue==true){
        angular.copy(mdl.shipping,mdl.billing);
        mdl.billing.data.kind="billing";
      }
    });

    SystemService.getCountries().then(function (response) {
      mdl.countries = response.data.data;
    });


    $scope.$watch("mdl.shipping.data.country", function (newValue, oldValue) {
      if (newValue) {
        SystemService.getStates(newValue).then(function (response) {
          mdl.shipping.states = response.data.data;
        });
      }
    });
    $scope.$watch("mdl.billing.data.country", function (newValue, oldValue) {
      if (newValue) {
        SystemService.getStates(newValue).then(function (response) {
          mdl.billing.states = response.data.data;
        });
      }
    });

    $scope.$watch("mdl.shipping.data.state", function (newValue, oldValue) {
      if (newValue) {
        SystemService.getCities(mdl.shipping.data.country, newValue).then(function (response) {
          mdl.shipping.cities = response.data.data;
        });
      }
    });
    $scope.$watch("mdl.billing.data.state", function (newValue, oldValue) {
      if (newValue) {
        SystemService.getCities(mdl.billing.data.country, newValue).then(function (response) {
          mdl.billing.cities = response.data.data;
        });
      }
    });

    function add() {
      $scope.$broadcast("validation", true);

      if(mdl.shipping.form.$valid && (mdl.sameAsShipping || mdl.billing.form.$valid)) {
          var promises=[JobsitesService.addSite($scope.user.id, mdl.shipping.data)];
          if(!mdl.sameAsShipping){
            promises.push(JobsitesService.addSite($scope.user.id, mdl.billing.data));
          }


          $q.all(promises).then(function (responses) {
                var shippingId=responses[0].data.data.id;
                var billingId;
                if(mdl.sameAsShipping){
                  billingId=shippingId;
                }else{
                  billingId=responses[1].data.data.id;
                }

                var data={
                  billing_address:billingId,
                  location:shippingId
                };
                CartService.update(currentCartId, data).then(function(){
                  checkout();
                });
          });
      }
    };

    function checkout(){
      CartService.checkout(currentCartId).then(function(){
        alert("Success");
      });
    }

    $scope.continueWithPayment = function(){
        if(mdl.cartData.location==null){
          add();
        }else{
          checkout();
        }
    };
  }
);