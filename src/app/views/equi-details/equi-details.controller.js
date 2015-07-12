angular.module('BG').controller('EquiDetailsCtrl',
  /** @ngInject */
    function ($scope, $state, $stateParams, EquiDetailsService) {
    var mdl = $scope.mdl = {};
    $scope.mainMdl.title = "Equipment Details";
    $scope.addBreadcrumb({title: "Equipment Details"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });
    if ($stateParams.id) {
      EquiDetailsService.getDetails($stateParams.id).then(function (response) {
        mdl.equi = response.data.data;
      });
    }
  }
);