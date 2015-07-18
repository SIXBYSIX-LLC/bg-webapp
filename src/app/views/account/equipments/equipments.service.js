angular.module('BG').factory('EquipmentsService',

  /** @ngInject */
    function (API,PaginationService) {
    return {
      getEquipments:function(id,page,page_size){
        return PaginationService.get("GET",
            API.baseURL+"products?",//user="+id,
            null,
            true,
            page,
            page_size);
      }
    }
  }
);