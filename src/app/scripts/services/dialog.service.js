angular.module('BG').factory("Dialog",
  /** @ngInject */
  function($modal,$rootScope){
    var Dialog = {
      open:function(conf){
        conf = angular.extend({
//          backdrop:"static",
//          keyboard: false,
        },conf);
        console.log("conf",conf);
        var mi=$modal.open(conf);
        console.log(mi);
        return mi;
      }
    };
    return Dialog;
  }
);