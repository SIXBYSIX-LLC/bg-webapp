angular.module('BG').controller('SignUpCtrl',

  /** @ngInject */
  function($scope,$state,SignUpService,$modalInstance,$state){
      var signUpMdl = $scope.signUpMdl = {
        errorMessage:""
      };
      signUpMdl.signUp=function(){
        $scope.buttonLoader = true;
        $scope.$broadcast("validation",true);
        if(signUpMdl.form.$valid){
          if(signUpMdl.data.password==signUpMdl.data.confirmPassword){
            $scope.$broadcast("PI:Process",true);

            SignUpService.signUp(signUpMdl.data).then(function(response){
              $scope.$broadcast("PI:Process",false);
              if(response.data.error) {
                $scope.buttonLoader = false;
                var details=response.data.error.detail;
                var msg="";
                angular.forEach(Object.keys(details),function(key){
                   msg+=key+":"+details[key]+"\n";
                });
                signUpMdl.errorMessage=msg;
              }else{
                $scope.buttonLoader = false;
                signUpMdl.login();
              }
            });
          }else{
            $scope.buttonLoader = false;
            signUpMdl.errorMessage="Password and confirm password do not match";
          }

        }
      };
      signUpMdl.login=function(){
         $modalInstance.close();
         $scope.openLogin();
      };

      $scope.close = function() {
        $modalInstance.close();
      }
      //console.log("XXX",$scope.modalInstance,$modalInstance);
      signUpMdl.data ={};
  }
);