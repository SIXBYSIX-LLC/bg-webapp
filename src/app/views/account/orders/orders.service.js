angular.module('BG').factory('OrdersService',

  /** @ngInject */
    function (API,$http) {
    return {
      getOrders:function(){
        return $http.get(API.baseURL+"orders");
      },
      getOrder:function(id){
        return $http.get(API.baseURL+"orders/"+id);
      }
    }
  }
);