angular.module('BG').controller('SignUpCtrl',

  /** @ngInject */
  function($scope,SignUpService){
      var signUpMdl = $scope.signUpMdl = {};
      signUpMdl.signUp=function(){
        $scope.$broadcast("validation",true);
      }
  }
);