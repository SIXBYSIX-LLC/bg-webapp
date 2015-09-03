angular.module('BG').factory('SellerOrdersService',

  /** @ngInject */
    function (API,$http) {
    return {
      getOrders:function(){
        return $http.get(API.baseURL+"orderlines");
      },
      getOrder:function(id){
        return $http.get(API.baseURL+"orderlines/"+id);
      }
    }
  }
);