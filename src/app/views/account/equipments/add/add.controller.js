angular.module('BG').controller('AddEquipmentsCtrl',
  /** @ngInject */
    function ($scope,EquipmentsService,SystemService) {

    var addEquiMdl = $scope.addEquiMdl = {
      data:{
        daily_price:0,
        weekly_price:0,
        monthly_price:0,
        selling_price:0,
        condition:"new"
      }
    };


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
    });

    EquipmentsService.getCategories().then(function(response){
      addEquiMdl.categories1=response.data.data;
      addEquiMdl.categories2=null;
      addEquiMdl.categories3=null;
    });

    $scope.$watch("addEquiMdl.data.category1",function(newValue){
      if(newValue){
        EquipmentsService.getCategories(newValue).then(function(response){
          addEquiMdl.categories2=response.data.data;
        });
        addEquiMdl.categories3=null;
      }
    });
    $scope.$watch("addEquiMdl.data.category2",function(newValue){
      if(newValue){
        EquipmentsService.getCategories(newValue).then(function(response){
          addEquiMdl.categories3=response.data.data;
        });

      }
    });
  }
);