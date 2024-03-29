angular.module('BG').controller('LoginCtrl',

  /** @ngInject */
    function($scope,LoginService,$modalInstance,$state,$rootScope,$auth){
    var loginMdl = $scope.loginMdl = {
      errorMessage:""
    };
    $scope.authenticate = function(provider) {
      $auth.authenticate(provider);
    };

    loginMdl.rememberMe = true;
    loginMdl.login=function(){
      $scope.buttonLoader = true;
      $scope.$broadcast("validation",true);
      if(loginMdl.form.$valid){
        $scope.$broadcast("PI:Process",true);
        LoginService.login(loginMdl.data).then(function(response){
          $scope.$broadcast("PI:Process",false);
          if(response.data.error) {
            $scope.buttonLoader = false;
            loginMdl.errorMessage=response.data.error.detail;
          }else{
            $scope.buttonLoader = false;
            localStorage.user=JSON.stringify(response.data.data);
            $modalInstance.close();
            $rootScope.$broadcast("BG:System:UserLoggedIn");
          }
        })
      }
    };

    $scope.close = function() {
      $modalInstance.close();
    }

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
