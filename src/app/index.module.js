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
      'braintree-angular',
      'toggle-switch',
      'angular-ladda',
      'chieffancypants.loadingBar'
    ])
    .run(["$rootScope",function($rootScope){
      $rootScope.dateFormat = 'dd-MMMM-yyyy';
    }])

})();
