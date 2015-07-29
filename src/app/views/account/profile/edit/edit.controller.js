angular.module('BG').controller('EditProfileCtrl',
  /** @ngInject */
    function ($scope,Upload,API,$state,ProfileService) {
    var editProfileMdl = $scope.editProfileMdl = {};
    editProfileMdl.fileToUpload=null;

    ProfileService.getUser($scope.user.id).then(function(response){
      editProfileMdl.user = response.data.data;
    });




    $scope.updateProfile = function () {
      $scope.$broadcast("validation", true);
      if(editProfileMdl.form.$valid){
        var usr=editProfileMdl.user;
        var data={
          zip_code:usr.zip_code,
          fullname:usr.fullname,
          phone:usr.phone,
          store_name:usr.store_name,
          timezone:usr.timezone
        };
        ProfileService.updateUser($scope.user.id,data).then(function(){
          $state.go("main.account.profile.view");
        });
      }
    }
  }
);