angular.module('BG').controller('AccountCtrl',
  /** @ngInject */
    function ($scope) {
    var mdl = $scope.mdl = {};
    $scope.mainMdl.title = "Account";
    $scope.addBreadcrumb({title: "Account"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });
  }
);