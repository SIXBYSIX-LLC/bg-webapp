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
  });