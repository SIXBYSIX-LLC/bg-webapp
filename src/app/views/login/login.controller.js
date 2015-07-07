angular.module('BG').controller('LoginCtrl',

  /** @ngInject */
    function($scope,LoginService){
    var loginMdl = $scope.loginMdl = {};
    loginMdl.login=function(){
      $scope.$broadcast("validation",true);
      if(loginMdl.form.$valid){
        LoginService.login(loginMdl.data).then(function(data){
          console.log("Data",data);
        })
      }
    };
    loginMdl.data ={};
  }
);