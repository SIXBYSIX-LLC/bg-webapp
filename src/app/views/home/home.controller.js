angular.module('BG').controller('HomeCtrl',
  /** @ngInject */
  function($scope,$state){
    var mdl = $scope.mdl = {};
    mdl.tab="rent";
    $scope.open = function($event,type) {
      $scope.openedStart = false;
      $scope.openedEnd = false;
      $event.preventDefault();
      $event.stopPropagation();

      $scope['opened'+type] = true;
    };
    $scope.dt = new Date();
    $scope.minDate = $scope.minDate ? null : new Date();
    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1,
      class: 'datepicker'
    };

    mdl.search=function(){
        if(mdl.searchText){
            $state.go("main.search",{query:mdl.searchText});
        }
    };
  }
);