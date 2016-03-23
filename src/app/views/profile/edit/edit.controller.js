angular.module('BG').controller('EditProfileCtrl',
  /** @ngInject */
    function ($scope,$state,ProfileService,Upload,$q,API) {
    var editProfileMdl = $scope.editProfileMdl = {};


    ProfileService.getUser($scope.user.id).then(function(response){
      editProfileMdl.user = response.data.data;
    });



    function upload(id,file) {
      var deferred=$q.defer();
      Upload.upload({
        url: API.baseURL + 'staticfiles',
        fields: {
          target: "usr.Profile.credit_form",
          target_id: id
        },
        file: file
      }).progress(function (evt) {
        file.progress=parseInt(100.0 * evt.loaded / evt.total);
        file.status="Uploading";
      }).success(function (data, status, headers, config) {
        file.status="Uploaded";
        deferred.resolve();
      }).error(function (data, status, headers, config) {
        file.status="Error";
        file.progress=0;
        deferred.resolve();
      });
      return deferred.promise;
    }

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
          if(editProfileMdl.fileToUpload){
            upload(usr.id,editProfileMdl.fileToUpload).then(function(){
              $state.go("main.profile.view");
            });
          }else{
            $state.go("main.profile.view");
          }
        });
      }
    }
  }
);