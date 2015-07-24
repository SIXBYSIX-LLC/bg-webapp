angular.module('BG').factory('EquipmentsService',

  /** @ngInject */
    function (API,PaginationService,$http) {
    return {
      getEquipments:function(id,page,page_size){
        return PaginationService.get("GET",
            API.baseURL+"products?",//user="+id,
            null,
            true,
            page,
            page_size);
      },
      getCategories:function(parentId){
        return $http.get( API.baseURL+"categories"+(parentId ? "?parent="+parentId : "?parent__isnull=True"));
      }
    }
  }
);