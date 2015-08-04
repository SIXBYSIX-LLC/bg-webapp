angular.module('BG').controller('SignUpCtrl',

  /** @ngInject */
  function($scope,$state,SignUpService,$modalInstance,$state){
      var signUpMdl = $scope.signUpMdl = {
        errorMessage:""
      };
      signUpMdl.signUp=function(){
        $scope.$broadcast("validation",true);
        if(signUpMdl.form.$valid){
          if(signUpMdl.data.password==signUpMdl.data.confirmPassword){
            $scope.$broadcast("PI:Process",true);

            SignUpService.signUp(signUpMdl.data).then(function(response){
              $scope.$broadcast("PI:Process",false);
              if(response.data.error) {
                var details=response.data.error.detail;
                var msg="";
                angular.forEach(Object.keys(details),function(key){
                   msg+=key+":"+details[key]+"\n";
                });
                signUpMdl.errorMessage=msg;
              }else{
                signUpMdl.login();
              }
            });
          }else{
            signUpMdl.errorMessage="Password and confirm password do not match";
          }

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