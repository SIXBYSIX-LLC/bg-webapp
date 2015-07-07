angular.module('BG').controller('LoginCtrl',

  /** @ngInject */
    function($scope,LoginService,$modalInstance){
    var loginMdl = $scope.loginMdl = {};
    loginMdl.login=function(){
      $scope.$broadcast("validation",true);
      if(loginMdl.form.$valid){
        LoginService.login(loginMdl.data).then(function(response){
          console.log("XX",response);
          if(response.data){
            localStorage.userToken=response.data.data.token;
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