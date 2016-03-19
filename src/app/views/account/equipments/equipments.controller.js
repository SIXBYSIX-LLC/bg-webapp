angular.module('BG').controller('EquipmentsCtrl',
  /** @ngInject */
    function ($scope) {
    $scope.addBreadcrumb({title: "Equipments"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });
    console.log($scope.addBreadcrumb);


  }
);
