(function() {
  'use strict';

  angular
    .module('BG', ['ngAnimate',
      'ngSanitize',
      'ngFileUpload',
      'ngResource',
      'ui.router',
      'ui.bootstrap',
      'ngMap',
      'ngTagsInput',
      'pascalprecht.translate'])
    .run(["$rootScope",function($rootScope){
      $rootScope.dateFormat = 'dd-MMMM-yyyy';
    }])

})();
