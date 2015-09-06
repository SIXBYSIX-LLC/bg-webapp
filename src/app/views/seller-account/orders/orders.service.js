angular.module('BG').factory('SellerOrdersService',

  /** @ngInject */
    function (API,$http) {
    return {
      getOrders:function(){
        return $http.get(API.baseURL+"orderlines");
      },
      getOrder:function(id){
        return $http.get(API.baseURL+"orderlines/"+id);
      },
      updateStatus:function(orderId,itemId,status,comment){
        return $http.put(API.baseURL+"orderlines/"+orderId+"/items/"+itemId+"/actions/change_status",{
          status:status,
          info:{
            comment:comment
          }
        });
      }
    }
  }
);