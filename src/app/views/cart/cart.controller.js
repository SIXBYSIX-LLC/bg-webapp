angular.module('BG').controller('CartCtrl',
  /** @ngInject */
    function ($scope, CartService) {
    var currentCartId;
    var mdl = $scope.mdl = {};
    function getCart(){
      CartService.getCurrent().then(function (response) {
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
      CartService.removeItem(currentCartId, item.id).then(getCart)
    };

    $scope.update = function (item) {
      CartService.updateItem(currentCartId, item.id, item).then(getCart);
    }


  });