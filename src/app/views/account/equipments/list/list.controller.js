angular.module('BG').controller('ListEquipmentsCtrl',
  /** @ngInject */
    function ($scope,EquipmentsService) {

    var listEquiMdl = $scope.listEquiMdl = {};
    var equis=null;

    function find(){
      equis=EquipmentsService.getEquipments($scope.user.id);
      listEquiMdl.nextAvailable=true;
      listEquiMdl.working=true;
      equis.next().then(function(response){
        listEquiMdl.working=false;
        listEquiMdl.products=response.data.data;
        listEquiMdl.resultCount=response.data.meta.count;
        listEquiMdl.nextAvailable=equis.isAvail();
      });
      listEquiMdl.next=function(){
        if(equis.isAvail()){
          listEquiMdl.working=true;
          equis.next().then(function (response) {
            listEquiMdl.working=false;
            Array.prototype.push.apply(listEquiMdl.products,response.data.data);
            listEquiMdl.nextAvailable=equis.isAvail();
          });
        }
      };
    }

    find();


    listEquiMdl.filter="all";
    listEquiMdl.updateFilter=function(value){
      listEquiMdl.filter=value;
    }

  }
);