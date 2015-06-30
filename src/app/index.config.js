(function() {
  'use strict';

  angular
    .module('BG')
    .config(config);

  /** @ngInject */
  function config($logProvider,$translateProvider) {
    $translateProvider.useStaticFilesLoader({
      prefix: '/app/i18n/',
      suffix: '.json'
    });
  }

})();
