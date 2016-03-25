angular.module('BG').controller('ChangePasswordCtrl',
  /** @ngInject */
    function ($scope,$state,ProfileService) {
    var changePwdMdl = $scope.changePwdMdl = {};
    $scope.changePassword=function(){
      $scope.$broadcast("validation", true);
      if(changePwdMdl.form.$valid){

      }
    }
  }
);