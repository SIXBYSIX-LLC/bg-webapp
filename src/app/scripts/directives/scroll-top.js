angular.module('BG').directive("scrollTop",
  /** @ngInject */
    function(){
    return {
      scope:false,
      restrict:"A",
      link:function(scope,elem,attrs){
          scope.$on("$stateChangeSuccess",function(){
            elem[0].scrollTop=0;
          });
          scope.$on("BG:System:ScrollTop",function(){
            elem[0].scrollTop=0;
          })
      }
    }
  })

.directive('showtab',
    function () {
        return {
            link: function (scope, element, attrs) {
                element.click(function(e) {
                    e.preventDefault();
                    $(element).tab('show');
                });
            }
        };
    })

.directive("scroll", ['$window', function ($window) {
    return function(scope, element, attrs) {
        angular.element($window).bind("scroll", function() {
             if (this.pageYOffset >= 100) {
                 scope.boolChangeClass = true;
                 console.log('Scrolled below header.');
             } else {
                 scope.boolChangeClass = false;
                 console.log('Header is in view.');
             }
            scope.$apply();
        });
    };
}]);