(function() {
  'use strict';

  angular
    .module('BG', ['ngAnimate', 'ngSanitize', 'ngResource', 'ui.router', 'ui.bootstrap','pascalprecht.translate'])
    .run(["$rootScope",function($rootScope){
      $rootScope.dateFormat = 'dd-MMMM-yyyy';
    }])

})();
