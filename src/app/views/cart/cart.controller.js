angular.module('BG').controller('CartCtrl',
  /** @ngInject */
    function ($scope, CartService, $timeout, $state) {
    $scope.mainMdl.title = "Shopping Cart";
    $scope.addBreadcrumb({title: "Shopping Cart", state:"main.cart"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });
    var currentCartId;
    var mdl = $scope.mdl = {};
    function getCart(){
      $timeout(function(){
        $scope.$broadcast("LI:Loading",true);
      });
      CartService.getCurrent().then(function (response) {
        $scope.$broadcast("LI:Loading",false);
        if (response && response.data && response.data.data) {
          currentCartId = response.data.data.id;
          mdl.data = response.data.data;
          console.log(mdl.data);
          mdl.total=0;
          for(var i=0;i< mdl.data.rental_products.length; i++){

            mdl.total+=mdl.data.rental_products[i].subtotal;
            }
          console.log(mdl.total);
        }
      });
    }

    getCart();

    $scope.mdl.qtys = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    $scope.mdl.shippingKinds = {
      "delivery": "Delivery",
      "pickup": "Pickup"
    };

    $scope.remove = function (item) {
      $scope.$broadcast("LI:Loading",true);
      $scope.$broadcast("PI:RemoveItem"+item.id,true);
      CartService.removeItem(currentCartId, item.id).then(function(){
        $scope.$broadcast("PI:RemoveItem"+item.id,false);
        getCart();
      })

    };

    $scope.update = function (item) {
      if(item.qty && item.shipping_kind){
        var data={
          qty:item.qty,
          shipping_kind:item.shipping_kind
        };
        CartService.updateItem(currentCartId, item.id, data).then(getCart);
      }
    };

    $scope.checkout = function(){
      $state.go("main.checkoutAddress");
      //CartService.checkout(currentCartId).then(function(){

      //});
    };


  });
