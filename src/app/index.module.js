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
      'angucomplete-alt',
      'pascalprecht.translate',
      'toggle-switch'])
    .run(["$rootScope",function($rootScope){
      $rootScope.dateFormat = 'dd-MMMM-yyyy';
    }])

})();
