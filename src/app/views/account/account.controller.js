angular.module('BG').controller('AccountCtrl',
  /** @ngInject */
    function ($scope) {
    var mdl = $scope.mdl = {};
    $scope.mainMdl.title = "Account";

    $scope.addBreadcrumb({title: "Buyer Dashboard",state:"main.account.dashboard"});
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
