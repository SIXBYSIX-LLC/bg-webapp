(function() {
  'use strict';

  angular
    .module('BG')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log,$translate) {

    $log.debug('runBlock end');
    $translate.use("en");
  }

})();
