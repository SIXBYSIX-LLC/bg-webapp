(function() {
  'use strict';

  angular
    .module('BG')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$translate,$rootScope,Dialog,$animate,$state) {
    //$animate.enabled(false);
    $translate.use("en");
    $rootScope.rmodel = {};

    $rootScope.openSignUp = function(){
      return Dialog.open({
        animation:false,
        templateUrl: 'app/views/sign-up/sign-up.html',
        controller:'SignUpCtrl',
        size:'sm'
      })
    };

    $rootScope.openLogin = function(){
      return Dialog.open({
        animation:false,
        templateUrl: 'app/views/login/login.html',
        controller:'LoginCtrl',
        size:'sm'
      })
    };

    $rootScope.logout = function(){
      localStorage.removeItem("user");
    };

    $rootScope.isLoggedIn=function(){
      return !!localStorage.user;
    };

    $rootScope.accountClick=function(){
      if($rootScope.isLoggedIn()){
        $state.go("main.account.dashboard");
      } else{
        $rootScope.openSignUp();
      }
    };

    if(localStorage.user){
      try{
        $rootScope.user=JSON.parse(localStorage.user)
      }catch(e){}
    }

    console.log($rootScope.user);

    $rootScope.foo=function(){
      console.log("Not Implemented");
    }



  }

})();
