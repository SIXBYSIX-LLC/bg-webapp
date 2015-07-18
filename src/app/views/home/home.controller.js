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
        //if(mdl.searchText){
        $state.go("main.search",{query:mdl.searchText || ""});
        //}
    };
    $scope.$on("$viewContentLoaded", function () {
      if (tjq('#mobile-search-tabs').length > 0) {
        var mobile_search_tabs_slider = tjq('#mobile-search-tabs').bxSlider({
          mode: 'fade',
          infiniteLoop: false,
          hideControlOnEnd: true,
          touchEnabled: true,
          pager: false,
          onSlideAfter: function($slideElement, oldIndex, newIndex) {
            console.log("ARgs",arguments);
            switch(newIndex){
              case 0:{mdl.tab='rent';break;}
              case 1:{mdl.tab='buy';break;}
              default:{mdl.tab='search'}
            }
            $scope.$$phase || $scope.$apply();
          }
        });
      }
    });

  }
);