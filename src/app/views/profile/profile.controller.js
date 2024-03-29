angular.module('BG').controller('ProfileCtrl',
  /** @ngInject */
    function ($scope,Upload,API) {
    var profileMdl = $scope.profileMdl = {};
    profileMdl.edit = true;
    profileMdl.fileToUpload=null;


    $scope.$watch("profileMdl.fileToUpload",function(newV,oldV){
      if(newV && newV[0]){
        $scope.upload(newV);
      }
    });
    $scope.upload = function(files){
      if(files && files[0]){
        console.log("files",files);
        Upload.upload({
          url: API.baseURL+'staticfile',
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

  }
);