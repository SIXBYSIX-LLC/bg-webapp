angular.module('BG').controller('ListInventoryCtrl',
  /** @ngInject */
    function ($scope, $state, $stateParams, EquipmentsService, InventoryService) {
    var mdl = $scope.mdl = {};



    $scope.$watch("invMdl.equiId",function(newValue){
      if(newValue){
        InventoryService.getInventoryList(newValue).then(function (response) {
          mdl.inventories = response.data.data;
        })
      }
    });

    $scope.valueChanged=function(inv){
      InventoryService.updateInventory($scope.invMdl.equiId,inv.id,{is_active:inv.is_active}).then(function(data){
        console.log("Updated");
      })
    }


  });