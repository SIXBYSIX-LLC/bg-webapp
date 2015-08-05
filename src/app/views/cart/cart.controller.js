angular.module('BG').controller('CartCtrl',
  /** @ngInject */
    function ($scope, CartService, $timeout) {
    $scope.mainMdl.title = "Shopping Cart";
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
    }


  });