angular.module('BG').controller('HomeCtrl',
  /** @ngInject */
  function($scope,$state,SearchService,HomeService){
    var mdl = $scope.mdl = {};

    HomeService.getCategories().then(function(response){
      console.log(response)
            mdl.categories=response.data.data;
    });

    HomeService.getRecent().then(function(response){
      console.log("home",response.data.data)
            mdl.recent=response.data.data;

    });
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
    (function(){
      angular.element('.carousel-showmanymoveone .item').each(function(){
        var itemToClone = angular.element(this);

        for (var i=1;i<4;i++) {
          itemToClone = itemToClone.next();

          // wrap around if at end of item collection
          if (!itemToClone.length) {
            itemToClone = angular.element(this).siblings(':first');
          }

          // grab item, clone, add marker class, add to collection
          itemToClone.children(':first-child').clone()
            .addClass("cloneditem-"+(i))
            .appendTo(angular.element(this));
        }
      });
    }());
    $scope.$watch("mdl.searchObj",function(){
      if(mdl.searchObj){
        $state.go("main.search",{query:mdl.searchObj.title},{ reload: true });
      }
    });
    mdl.search=function(){
      //if(mdl.searchText){
      $state.go("main.search",{query:(mdl.searchObj ? mdl.searchObj.title :mdl.searchText ) || ""},{ reload: true });
      //}
    };
    mdl.searchHelper = function(userInputString, timeoutPromise){
      return SearchService.searchHelper(userInputString).then(function(response){
        return response;
      });
    };
    mdl.inputChanged = function(text){
      mdl.searchText=text;
    }

    $scope.moreEquipments = function() {
      $scope.isMore = !$scope.isMore;
    }

    $scope.closeEquipment = function() {
      $scope.isMore = false;
    }

  }
);
