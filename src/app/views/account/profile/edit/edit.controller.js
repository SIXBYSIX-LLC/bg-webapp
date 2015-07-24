angular.module('BG').controller('EditProfileCtrl',
  /** @ngInject */
    function ($scope,Upload,API,$state) {
    var editProfileMdl = $scope.editProfileMdl = {};
    editProfileMdl.fileToUpload=null;




    $scope.updateProfile = function () {
      $state.go("");
    }
  }
);