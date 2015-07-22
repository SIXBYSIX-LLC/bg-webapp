angular.module('BG').factory("Dialog",
  /** @ngInject */
  function($modal){
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
      },
      info:function(message,title){
        return Dialog.open({
          animation:false,
          templateUrl: 'app/components/modal/modal.html',
          controller:['$scope','$modalInstance',function($scope,$modalInstance){
            $scope.modal={
              message:message,
              title:title
            };
            $scope.ok=function(){
              $modalInstance.close();
            }
          }],
          size:'sm'
        })
      }
    };
    return Dialog;
  }
);