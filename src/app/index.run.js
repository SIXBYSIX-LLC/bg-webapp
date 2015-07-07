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

    $rootScope.$on("$viewContentLoaded",function(){
      tjq("#price-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ 100, 800 ],
        slide: function( event, ui ) {
          tjq(".min-price-label").html( "$" + ui.values[ 0 ]);
          tjq(".max-price-label").html( "$" + ui.values[ 1 ]);
        }
      });
      tjq(".min-price-label").html( "$" + tjq("#price-range").slider( "values", 0 ));
      tjq(".max-price-label").html( "$" + tjq("#price-range").slider( "values", 1 ));

      tjq("#rating").slider({
        range: "min",
        value: 40,
        min: 0,
        max: 50,
        slide: function( event, ui ) {

        }
      });
    });

  }

})();
