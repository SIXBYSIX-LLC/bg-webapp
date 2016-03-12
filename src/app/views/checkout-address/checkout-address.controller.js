angular.module('BG').controller('CheckoutAddressCtrl',
  /** @ngInject */
    function ($scope, CartService, $timeout, $state, JobsitesService, SystemService, $q,$filter) {
    var mdl = $scope.mdl = {};
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
      //{{mdl.allSites | filter:{id:mdl.selectedShipping} }}
      mdl.selectedSite = $filter('filter')(mdl.allSites, {id:mdl.selectedShipping})[0];
      console.log(mdl.selectedSite);
    });

    CartService.getCurrent().then(function (response) {
      $scope.$broadcast("LI:Loading", false);
      if (response && response.data && response.data.data) {
        currentCartId = response.data.data.id;
        mdl.cartData = response.data.data;
        mdl.cartData.total=0;
        for(var i=0;i< mdl.cartData.rental_products.length; i++){

          mdl.cartData.total+=mdl.cartData.rental_products[i].subtotal;
        }
        console.log(mdl.total);
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

    $scope.$watch("mdl.sameAsShipping", function (newValue) {
      if (newValue == true) {
        angular.copy(mdl.shipping, mdl.billing);
        mdl.billing.data.kind = "billing";
      }
    });
    $scope.$watch("mdl.selectedShipping", function () {
      if (mdl.selectedShipping) {
        mdl.selectedSite = $filter('filter')(mdl.allSites, {id:mdl.selectedShipping})[0];
        console.log(mdl.selectedSite);
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

    $scope.$watch("mdl.selectedShipping", function () {
      if (mdl.sameAsShipping) {
        mdl.selectedBilling = mdl.selectedShipping;
      }
      if(!mdl.selectedShipping){
        mdl.shipping = {data: {
          kind: 'job_site',
          country: "6252001"
        }};
      }
    });

    $scope.$watch("mdl.selectedBilling",function(){
      if(!mdl.selectedBilling){
        mdl.billing = {data: {
          kind: 'billing',
          country: "6252001"
        }};
      }
    });

    $scope.$watch("mdl.shipping.data", function () {
      if (mdl.sameAsShipping) {
        mdl.billing.data = angular.copy(mdl.shipping.data);
      }
    }, true);

    $scope.$watch("mdl.sameAsShipping", function () {
      if (mdl.sameAsShipping) {
        mdl.selectedBilling = mdl.selectedShipping;
        mdl.billing.data = angular.copy(mdl.shipping.data);
      }
    });

    function add() {
      $scope.$broadcast("validation", true);
      if ((!mdl.shipping.form || mdl.shipping.form.$valid ) && (!mdl.billing.form || mdl.billing.form.$valid)) {
        var data = {
          billing_address: 0,
          location: 0
        };

        if (mdl.selectedBilling) {
          data.billing_address = mdl.selectedBilling;
        }
        if (mdl.selectedShipping) {
          data.location = mdl.selectedShipping;
        }
        var promises = [];
        if (!data.billing_address || !data.location) {
          if (!data.location) {
            promises.push(JobsitesService.addSite($scope.user.id, mdl.shipping.data));
          }
          if (!mdl.sameAsShipping && !data.billing_address) {
            promises.push(JobsitesService.addSite($scope.user.id, mdl.billing.data));
          }

          $q.all(promises).then(function (responses) {

            if (!data.location) {
              data.location = responses[0].data.data.id
            }
            if(!data.billing_address){
              data.billing_address = mdl.sameAsShipping ?
                data.location
                :
                responses[1].data.data.id;
            }



            CartService.update(currentCartId, data).then(function () {
              checkout();
            });
          });
        } else {
          if (mdl.cartData.billing_address != data.billing_address || mdl.cartData.location != data.location) {
            CartService.update(currentCartId, data).then(function () {
              checkout();
            });
          } else {
            checkout();
          }
        }
      }

    }

    function checkout() {
      CartService.checkout(currentCartId).then(function(response){
        console.log("Res",response);
        if(response.data.data.invoice){
          $state.go("main.payment",{invoiceId:response.data.data.invoiceId});
        }
      });
    }

    $scope.continueWithPayment = function () {
      //if(mdl.cartData.location==null || mdl.cartData.billing_address==null){
      add();
      //}else{
      //checkout();
      //}
    };
  }
);
