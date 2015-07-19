angular.module('BG').controller('EditProfileCtrl',
  /** @ngInject */
    function ($scope,Upload,API,$state) {
    var editProfileMdl = $scope.editProfileMdl = {};
    editProfileMdl.fileToUpload=null;


    $scope.$watch("editProfileMdl.fileToUpload",function(newV,oldV){
      if(newV && newV[0]){
        $scope.upload(newV);
      }
    });
    $scope.upload = function(files){
      if(files && files[0]){
        console.log("files",files);
        Upload.upload({
          url: API.baseURL+'staticfiles',
          fields:{
            target:"catalog.Product.images",
            target_id:5
          },
          file: files[0]
        }).progress(function (evt) {
          var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
          console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
        }).success(function (data, status, headers, config) {
          console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
        }).error(function (data, status, headers, config) {
          console.log('error status: ' + status);
        })
      }

    };



    $scope.updateProfile = function () {
      $state.go("");
    }
  }
);