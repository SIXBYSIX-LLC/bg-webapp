angular.module('BG').factory('EquipmentsService',

  /** @ngInject */
    function (API,PaginationService,$http) {
    return {
      getEquipments:function(id,page,page_size){
        return PaginationService.get("GET",
            API.baseURL+"products?user="+id,
            null,
            true,
            page,
            page_size);
      },
      getAllEquipments:function(id){
        return $http.get(API.baseURL+"products?user="+id);
      },
      getCategories:function(parentId){
        return $http.get( API.baseURL+"categories"+(parentId ? "?parent="+parentId : "?parent__isnull=True"));
      },
      getAllCategories:function(){
        return $http.get( API.baseURL+"categories");
      },
      getEquipment:function(id){
        return $http.get(API.baseURL+"products/"+id);
      },
      addEquipment:function(data){
        return $http.post(API.baseURL+"products",data);
      },
      updateEquipment:function(id,data){
        return $http.patch(API.baseURL+"products/"+id,data);
      },
      deleteEquipment:function(id){
        return $http.delete(API.baseURL+"products/"+id);
      },
      deleteImage:function(id){
        return $http.delete(API.baseURL+"staticfiles/"+id);
      }
    }
  }
);