angular.module('BG').controller('ForgotPasswordCtrl',

  /** @ngInject */
    function($scope,$modalInstance,$state,$rootScope,ForgotPasswordService){
    var forgotMdl = $scope.forgotMdl = {
      errorMessage:""
    };
    forgotMdl.reset=function(){
      $scope.$broadcast("validation",true);
      if(forgotMdl.form.$valid){
        $scope.$broadcast("PI:Process",true);
        ForgotPasswordService.reset(forgotMdl.data).then(function(response){
          $scope.$broadcast("PI:Process",false);
          if(response.data.error) {
            forgotMdl.errorMessage=response.data.error.detail;
          }else{
            $modalInstance.close();
            $state.go("home");
          }
        })
      }
    };

    forgotMdl.cancel=function(){
      $modalInstance.close();

    };
    forgotMdl.data ={};
  }
);