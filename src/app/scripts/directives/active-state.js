angular.module('BG').directive("activeState",
  /** @ngInject */
    function($translate,$state){
      return {
        scope:false,
        restrict:"A",
        link:function(scope,elem,attrs){
          if(attrs.activeState){
            function check(){
              if($state.current.name.indexOf(attrs.activeState)==0){
                elem.addClass(attrs.activeClass || "active");
              }else{
                elem.removeClass(attrs.activeClass || "active");
              }
            }
            check();
            scope.$on("$stateChangeSuccess",check);
          }
        }
      }
    });