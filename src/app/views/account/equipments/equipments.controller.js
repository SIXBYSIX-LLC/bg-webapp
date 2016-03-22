angular.module('BG').controller('EquipmentsCtrl',
  /** @ngInject */
    function ($scope) {
    $scope.addBreadcrumb({title: "Equipments",state:"'main.sellerAccount.equipments.list"});
    $scope.$on("$stateChangeStart", function () {
      $scope.popBreadcrumb();
    });
    console.log($scope.addBreadcrumb);


  }
);
