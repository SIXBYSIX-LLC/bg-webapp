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
    });