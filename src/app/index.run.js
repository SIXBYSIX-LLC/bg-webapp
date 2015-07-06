(function() {
  'use strict';

  angular
    .module('BG')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$translate,$rootScope,Dialog) {

    $log.debug('runBlock end');
    $translate.use("en");
    $rootScope.rmodel = {};
    $rootScope.openSignUp = function(){
      Dialog.open({
        animation:false,
        templateUrl: 'app/views/sign-up/sign-up.html',
        size:'sm'
      })
    };

    $rootScope.openLogin = function(){
      Dialog.open({
        animation:true,
        templateUrl: 'app/views/login/login.html'
      })
    };

  }

})();
