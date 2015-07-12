(function() {
  'use strict';

  angular
    .module('BG')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope) {
    var mainMdl=$scope.mainMdl={};
    mainMdl.open = function($event,type) {
      mainMdl.openedStart = false;
      mainMdl.openedEnd = false;
      $event.preventDefault();
      $event.stopPropagation();

      mainMdl['opened'+type] = true;
    };
    mainMdl.minDate = mainMdl.minDate ? null : new Date();
    mainMdl.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };
  }

})();
