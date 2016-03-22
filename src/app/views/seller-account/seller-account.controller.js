angular.module('BG').controller('SellerAccountCtrl',
  /** @ngInject */
    function ($scope) {
      $scope.isShow = false;
    var mdl = $scope.mdl = {};
    $scope.mainMdl.title = "Seller Account";

    $scope.addBreadcrumb({title: "Seller Dashboard",state:"main.sellerAccount.dashboard"});
    $scope.$on("$destroy", function () {

      $scope.popBreadcrumb();
    });
    $scope.disableBreadcrumb(false);
    $scope.dashboard = function() {
      $scope.isShow = !$scope.isShow;
    }
    $scope.closeDashboard = function() {
      $scope.isShow = false;
    }
  }
);
