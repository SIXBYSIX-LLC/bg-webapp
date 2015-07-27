angular.module('BG').factory('InventoryService',

  /** @ngInject */
    function (API,$http) {
    return {

      addInventory:function(id,data){
        return $http.post(API.baseURL+"products/"+id+"/inventories",data);
      },

      updateInventory:function(prodId,id,data){
        return $http.patch(API.baseURL+"products/"+prodId+"/inventories/"+id,data);
      },

      getInventoryList:function(id){
        return $http.get(API.baseURL+"products/"+id+"/inventories");
      },

      getInventory:function(proId,id){
        return $http.get(API.baseURL+"products/"+proId+"/inventories/"+id);
      }

    }
  }
);