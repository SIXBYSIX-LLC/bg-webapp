//<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
angular.module('BG').directive("loadIndicator",
  /** @ngInject */
    function () {
    return {
      scope: false,
      restrict: "A",
      link: function (scope, elem, attrs) {

        scope.$on(attrs.loadIndicator || "LI:Loading", function (event, data) {
          if(data){
            elem.addClass("loading");
          } else{
            elem.removeClass("loading");
          }
        });

      }
    }
  });