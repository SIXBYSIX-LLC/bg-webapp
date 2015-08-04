angular.module('BG').controller('SignUpCtrl',

  /** @ngInject */
  function($scope,SignUpService,$modalInstance,$state){
      var signUpMdl = $scope.signUpMdl = {
        errorMessage:""
      };
      signUpMdl.signUp=function(){
        $scope.$broadcast("validation",true);
        if(signUpMdl.form.$valid){
          SignUpService.signUp(signUpMdl.data).then(function(data){
            if(response.data.error) {
              signUpMdl.errorMessage=response.data.error.detail;
            }else{

            }
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