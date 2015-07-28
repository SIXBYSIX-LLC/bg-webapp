angular.module('BG').factory('CartService',

  /** @ngInject */
    function (API,$http) {
    return {
      getCurrent:function(){
        return $http.get(API.baseURL+"carts/current");
      },
      addToCart:function(cartId,data){
        return $http.post(API.baseURL+"carts/"+cartId+"/rentals",data)
      },
      removeItem:function(cartId,id){
        //https://api.marketplace.com/v1/carts/cart_id/
        return $http.delete(API.baseURL+"carts/"+cartId+"/rentals/"+id);
      },
      updateItem:function(cartId,id,data){
        return $http.patch(API.baseURL+"carts/"+cartId+"/rentals/"+id,data)
      }
    }
  }
);