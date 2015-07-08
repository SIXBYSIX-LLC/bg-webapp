angular.module('BG').factory('SearchService',

  /** @ngInject */
    function (API,PaginationService) {
    return {
      search:function(query,page,page_size){
        return PaginationService.get("GET",
            API.baseURL+"products"+(query ? "?search="+encodeURIComponent(query): ""),
            null,
            !!query,
            page,
            page_size);
      }
    }
  }
);