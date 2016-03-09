angular.module('BG').controller('AddInventoryCtrl',
  /** @ngInject */
    function ($scope, $state, $stateParams, InventoryService) {
    var mdl = $scope.mdl = {data:{
      source:"purchased",
      is_active:"1"
    }};
    $scope.editMode= $state.current.name=="main.account.inventory.edit";

    if($scope.editMode){
      $scope.$watch("invMdl.equiId",function(value){
        if(value){
          InventoryService.getInventory($scope.invMdl.equiId,$stateParams.id).then(function(response){
            mdl.data=response.data.data;
            mdl.data.is_active=mdl.data.is_active?"1":"0";
          });
        }
      });

    }
    $scope.add = function () {
      $scope.$broadcast("validation", true);

      if (mdl.form.$valid) {
          var data=angular.copy(mdl.data);
          data.is_active=data.is_active=="1";
          if($scope.editMode){
            data.product = $scope.invMdl.equiId;
            InventoryService.updateInventory($scope.invMdl.equiId,$stateParams.id,data).then(function(response){
              $state.go("main.sellerAccount.inventory.list");
            })
          }else{
            InventoryService.addInventory($scope.invMdl.equiId,data).then(function(response){
              $state.go("main.sellerAccount.inventory.list");
            })
          }
      }
    }


  });