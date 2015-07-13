angular.module('BG').controller('ProfileCtrl',
  /** @ngInject */
    function ($scope) {
    var profileMdl = $scope.profileMdl = {};
    profileMdl.edit = false;

    $scope.editProfile = function () {
      profileMdl.edit = true;
    };

    $scope.cancelEdit = function () {
      profileMdl.edit = false;
    };

    $scope.updateProfile = function () {
      profileMdl.edit = false;
    }
  }
);