angular.module('BG').controller('InventoryCtrl',
  /** @ngInject */
    function ($scope, $state, $stateParams, EquipmentsService, InventoryService) {
    var invMdl = $scope.invMdl = {};
    invMdl.options={0:"Yes",1:"No"}

    EquipmentsService.getAllEquipments($scope.user.id).then(function(response){
      invMdl.equis=response.data.data;
      if(invMdl.equis[0]){
        invMdl.equiId=invMdl.equis[0].id;
      }
    });
  });
