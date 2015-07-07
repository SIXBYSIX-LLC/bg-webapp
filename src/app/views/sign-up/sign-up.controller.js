angular.module('BG').controller('SignUpCtrl',

  /** @ngInject */
  function($scope,SignUpService,$modalInstance){
      var signUpMdl = $scope.signUpMdl = {};
      signUpMdl.signUp=function(){
        $scope.$broadcast("validation",true);
        if(signUpMdl.form.$valid){
          SignUpService.signUp(signUpMdl.data).then(function(data){
            console.log("Data",data);
          });
        }
      };
      signUpMdl.login=function(){
         $modalInstance.close();
         $scope.openLogin();
      };
      //console.log("XXX",$scope.modalInstance,$modalInstance);
      signUpMdl.data ={};
  }
);