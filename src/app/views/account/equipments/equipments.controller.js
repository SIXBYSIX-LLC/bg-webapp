angular.module('BG').controller('EquipmentsCtrl',
  /** @ngInject */
    function ($scope,EquipmentsService) {
    var equiMdl = $scope.equiMdl = {};
    var equis=EquipmentsService.getEquipments($scope.user.id);
    equis.next().then(function(response){
      equiMdl.products=response.data.data;
      equiMdl.resultCount=response.data.meta.count;
      equiMdl.nextAvailable=equis.isAvail();
    });

    equiMdl.next=function(){
      if(equis.isAvail()){
        equis.next().then(function (response) {
          Array.prototype.push.apply(equiMdl.products,response.data.data);
          equiMdl.nextAvailable=equis.isAvail();
        });
      }
    };

    equiMdl.filter="all";
    equiMdl.updateFilter=function(value){
      equiMdl.filter=value;
    }

  }
);