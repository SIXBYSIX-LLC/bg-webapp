(function() {
  'use strict';

  angular
    .module('BG')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$translate,$rootScope,Dialog,$animate) {
    $animate.enabled(false);
    $log.debug('runBlock end');
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
      localStorage.removeItem("userToken");
    };



  }

})();
