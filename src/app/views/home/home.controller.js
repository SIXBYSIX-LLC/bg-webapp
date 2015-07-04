angular.module('BG').controller('HomeCtrl',[
  '$scope',
  function($scope){
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
      startingDay: 1
    };
  }
]);