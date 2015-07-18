angular.module('BG').factory("PaginationService",
  /** @ngInject */
    function ($http) {
    return {
        get:function(method,url,data,hasQueryParams, page,page_size){
          var obj = {
            url:url,
            last_count:100000,
            page:0,
            working:false,
            page_size:page_size || 10,
            next:function(){
              if(!obj.working){
                if(obj.last_count>(obj.page*obj.page_size)){
                  obj.page++;
                  return $http({
                    url:url+(hasQueryParams ? "&" : "?" )+"page="+obj.page+"&page_size="+obj.page_size,
                    method:method,
                    data:data || null
                  }).then(function(response){
                    obj.working=false;
                    obj.last_count = response.data.meta.count;
                    obj.avail = obj.last_count>(obj.page*obj.page_size);
                    return response;
                  });
                }
              }
              //this will lead into error
            },
            isAvail:function(){
              return obj.last_count>(obj.page*obj.page_size);
            }
          };
          return obj;
        }
    }
  });