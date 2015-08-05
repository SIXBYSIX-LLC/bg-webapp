//<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
angular.module('BG').directive("processIndicator",
  /** @ngInject */
    function () {
    return {
      scope: false,
      restrict: "A",
      link: function (scope, elem, attrs) {


        scope.$on(attrs.processIndicator || "PI:Process", function (event, data) {
         if(data){
           elem.addClass("process");
           elem.prop("disabled",true);
         } else{
           elem.removeClass("process");
           elem.prop("disabled",false);
         }
        });


        var elm = angular.element('<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
        elem.prepend(elm);
      }
    }
  });