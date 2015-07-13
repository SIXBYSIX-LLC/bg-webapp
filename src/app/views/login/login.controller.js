angular.module('BG').controller('LoginCtrl',

  /** @ngInject */
    function($scope,LoginService,$modalInstance,$state,$rootScope){
    var loginMdl = $scope.loginMdl = {};
    loginMdl.login=function(){
      $scope.$broadcast("validation",true);
      if(loginMdl.form.$valid){
        LoginService.login(loginMdl.data).then(function(response){
          if(response.data){
            localStorage.user=JSON.stringify(response.data.data);
            $rootScope.user=response.data.data;
            $modalInstance.close();
            $state.go("main.account.dashboard");
          }
        })
      }
    };

    loginMdl.signUp=function(){
      $modalInstance.close();
      $scope.openSignUp();
    };
    loginMdl.data ={};
  }
);