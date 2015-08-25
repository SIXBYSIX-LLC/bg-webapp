angular.module('BG').controller('LoginCtrl',

  /** @ngInject */
    function($scope,LoginService,$modalInstance,$state,$rootScope,Dialog){
    var loginMdl = $scope.loginMdl = {
      errorMessage:""
    };
    loginMdl.rememberMe = true;
    loginMdl.login=function(){
      $scope.$broadcast("validation",true);
      if(loginMdl.form.$valid){
        $scope.$broadcast("PI:Process",true);
        LoginService.login(loginMdl.data).then(function(response){
          $scope.$broadcast("PI:Process",false);
          if(response.data.error) {
            loginMdl.errorMessage=response.data.error.detail;
          }else{
            localStorage.user=JSON.stringify(response.data.data);
            $modalInstance.close();
            $rootScope.$broadcast("BG:System:UserLoggedIn");
          }
        })
      }
    };

    loginMdl.signUp=function(){
      $modalInstance.close();
      $scope.openSignUp();
    };
    loginMdl.forgotPassword=function(){
      $modalInstance.close();
      $scope.openForgotPassword();
    };
    loginMdl.data ={};
  }
);