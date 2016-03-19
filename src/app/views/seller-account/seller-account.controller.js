angular.module('BG').controller('SellerAccountCtrl',
  /** @ngInject */
    function ($scope) {
      $scope.isShow = false;
    var mdl = $scope.mdl = {};
    $scope.mainMdl.title = "Seller Account";
    $scope.mainMdl.showToggle = true;
    $scope.addBreadcrumb({title: "Seller Account",state:"main.sellerAccount.dashboard"});
    $scope.$on("$destroy", function () {
      $scope.mainMdl.showToggle = false;
      $scope.popBreadcrumb();
    });
    $scope.dashboard = function() {
      $scope.isShow = !$scope.isShow;
    }
    $scope.closeDashboard = function() {
      $scope.isShow = false;
    }
  }
);
