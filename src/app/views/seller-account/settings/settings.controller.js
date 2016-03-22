angular.module('BG').controller('SettingsCtrl',
  /** @ngInject */
    function ($scope) {
    var mdl = $scope.mdl = {};
    $scope.addBreadcrumb({title: "Settings",state:"main.sellerAccount.settings"});
    $scope.$on("$stateChangeStart", function () {

      $scope.popBreadcrumb();
    });

      $scope.mdl.tabs = [
        { title:'Dynamic Title 1', content:'Dynamic content 1' },
        { title:'Dynamic Title 2', content:'Dynamic content 2', disabled: true }
      ];



  });
