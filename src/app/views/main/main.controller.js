(function() {
  'use strict';

  angular
    .module('BG')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,$state) {
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

    mainMdl.breadcrumbs=[];
    $scope.addBreadcrumb=function(value){
      mainMdl.breadcrumbs.push(value);
    };

    $scope.popBreadcrumb=function(){
      return mainMdl.breadcrumbs.pop();
    };

    mainMdl.search=function(){
      if(mainMdl.searchText){
        $state.go("main.search",{query:mainMdl.searchText || ""},{ reload: true });
      }
    }


  }

})();
