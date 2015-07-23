angular.module('BG').controller('CartCtrl',
  /** @ngInject */
    function ($scope,CartService) {
      var currentCartId;
      var mdl=$scope.mdl={};
      CartService.getCurrent().then(function(response){
        if(response && response.data && response.data.data){
          currentCartId=response.data.data.id;
          mdl.rental_products = response.data.data.rental_products;
        }
      });

      $scope.mdl.qtys=[0,1,2,3,4,5,6,7,8];

      $scope.mdl.shippingKinds={
        "delivery":"Delivery",
        "pickup":"Pickup"
      };



    });