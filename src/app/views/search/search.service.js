angular.module('BG').factory('SearchService',

  /** @ngInject */
    function (API,PaginationService) {
    return {
      search:function(conf,page,page_size){
        var enc=encodeURIComponent;
        var values=[];
        angular.forEach(conf,function(value,key){
          if(key=="order_by"){
            values.push(key+"="+enc(value.join(",")));
          }else{
            values.push(key+"="+enc(value));
          }
        });
        console.log(values);
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