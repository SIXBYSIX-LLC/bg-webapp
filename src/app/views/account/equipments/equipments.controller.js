angular.module('BG').controller('EquipmentsCtrl',
  /** @ngInject */
    function ($scope) {
    $scope.addBreadcrumb({title: "Equipments",state:"'main.sellerAccount.equipments.list"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });
    console.log($scope.addBreadcrumb);


  }
);
