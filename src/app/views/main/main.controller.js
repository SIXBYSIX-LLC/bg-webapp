(function() {
  'use strict';

  angular
    .module('BG')
    .controller('MainController', MainController);

  /** @ngInject */
  function MainController($scope,$state,SearchService) {
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

    $scope.$watch("mainMdl.searchObj",function(){
      if(mainMdl.searchObj){
        $state.go("main.search",{query:mainMdl.searchObj.title},{ reload: true });
      }
    });
    mainMdl.search=function(){
      //if(mainMdl.searchText){
      $state.go("main.search",{query:(mainMdl.searchObj ? mainMdl.searchObj.title :mainMdl.searchText ) || ""},{ reload: true });
      //}
    };
    mainMdl.searchHelper = function(userInputString, timeoutPromise){
      return SearchService.searchHelper(userInputString).then(function(response){
        return response;
      });
    };
    mainMdl.inputChanged = function(text){
      mainMdl.searchText=text;
    }


  }

})();
