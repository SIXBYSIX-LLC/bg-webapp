//<span class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>
angular.module('BG').directive("processIndicator",
  /** @ngInject */
    function ($translate, $compile) {
    return {
      scope: false,
      restrict: "A",
      link: function (scope, elem, attrs) {
        var piMdl = scope.piMdl = {
          show: false
        };

        scope.$on(attrs.processIndicator || "PI:Process", function (event, data) {
          console.log("XX", data);
          piMdl.show = data;
          scope.$$phase || scope.$apply();
        });


        var elm = angular.element('<span ng-show="piMdl.show" class="glyphicon glyphicon-refresh glyphicon-refresh-animate"></span>');
        $compile(elm)(scope);
        elem.prepend(elm);
      }
    }
  });