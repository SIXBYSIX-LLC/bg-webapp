angular.module('BG').controller('AddEquipmentsCtrl',
  /** @ngInject */
    function ($scope,EquipmentsService,SystemService) {

    var addEquiMdl = $scope.addEquiMdl = {};

    addEquiMdl.countries=[];
    addEquiMdl.states=[];
    addEquiMdl.cities=[];
    SystemService.getCountries().then(function(response){
      addEquiMdl.countries=response.data.data;
    });

    $scope.$watch("addEquiMdl.countryId",function(newValue,oldValue){
      if(newValue){
        SystemService.getStates(addEquiMdl.countryId).then(function(response){
          addEquiMdl.states=response.data.data;
        });
      }
    });

    $scope.$watch("addEquiMdl.stateId",function(newValue,oldValue){
      if(newValue){
        SystemService.getCities(addEquiMdl.countryId,addEquiMdl.stateId).then(function(response){
          addEquiMdl.cities=response.data.data;
        });
      }
    })
  }
);