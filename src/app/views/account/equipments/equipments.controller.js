angular.module('BG').controller('EquipmentsCtrl',
  /** @ngInject */
    function ($scope,EquipmentsService) {

    var equiMdl = $scope.equiMdl = {};
    var equis=null;

    function find(){
      equis=EquipmentsService.getEquipments($scope.user.id);
      equiMdl.nextAvailable=true;
      equiMdl.working=true;
      equis.next().then(function(response){
        equiMdl.working=false;
        equiMdl.products=response.data.data;
        equiMdl.resultCount=response.data.meta.count;
        equiMdl.nextAvailable=equis.isAvail();
      });
      equiMdl.next=function(){
        if(equis.isAvail()){
          equiMdl.working=true;
          equis.next().then(function (response) {
            equiMdl.working=false;
            Array.prototype.push.apply(equiMdl.products,response.data.data);
            equiMdl.nextAvailable=equis.isAvail();
          });
        }
      };
    }

    find();


    equiMdl.filter="all";
    equiMdl.updateFilter=function(value){
      equiMdl.filter=value;
    }

  }
);