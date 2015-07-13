angular.module('BG').factory('SearchService',

  /** @ngInject */
    function (API,PaginationService) {
    return {
      search:function(conf,page,page_size){
        var params={};
        var enc=encodeURIComponent;
        params.search=enc(conf.search||"");
        if(conf.order_by){
          params.order_by=enc(conf.order_by.join(","));
        }
        var values=[];
        console.log(params);
        angular.forEach(params,function(value,key){
          values.push(key+"="+enc(value));
        });
        return PaginationService.get("GET",
            API.baseURL+"products?"+values.join("&"),
            null,
            true,
            page,
            page_size);
      }
    }
  }
);