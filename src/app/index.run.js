(function() {
  'use strict';

  angular
    .module('BG')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$translate,$rootScope,Dialog,$animate,$state,LoginService,CartService) {
    //$animate.enabled(false);
    $translate.use("en");
    $rootScope.rmodel = {
      message:{
        text:"Sample",
        show:true,
        type:'help'
      }
    };

    $rootScope.$on("BG:System:TopMessage",function(event,data){
      var rm=$rootScope.rmodel.message;
      rm.text=data.text;
      rm.type=data.type || help;
      rm.show=true;
    });
    $rootScope.$on('$stateChangeStart',
      function(event, toState, toParams, fromState, fromParams){
        if(toState && toState.name){
          if(toState.name.indexOf("main.account")==0){
            if(!$rootScope.isLoggedIn()){
              event.preventDefault();
              $state.go("home")
            }
          }
        }
      });

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

    $rootScope.openForgotPassword = function(){
      return Dialog.open({
        animation:false,
        templateUrl: 'app/views/forgot-password/forgot-password.html',
        controller:'ForgotPasswordCtrl',
        size:'sm'
      })
    };

    $rootScope.logout = function(){
      localStorage.removeItem("user");
      LoginService.logout();
      $state.go("home")
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


    $rootScope.$on("BG:System:UserLoggedIn",function(){

    });
    $rootScope.$on("BG:System:CartCount",function(event,value){
      $rootScope.rmodel.cartCount=value;
    });

    if(localStorage.user){
      try{
        $rootScope.user=JSON.parse(localStorage.user);
        CartService.getCurrent().then(function(response){

        });
      }catch(e){}
    }

    console.log($rootScope.user);

    $rootScope.foo=function(){
      console.log("Not Implemented");
    }



  }

})();
