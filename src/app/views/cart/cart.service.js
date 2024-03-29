angular.module('BG').factory('CartService',

  /** @ngInject */
    function (API,$http,$rootScope) {
    return {
      getCurrent:function(){
        return $http.get(API.baseURL+"carts/current").then(function(response){
          if(response.data && response.data.data){
            $rootScope.$broadcast("BG:System:CartCount",response.data.data.rental_products.length);
          }
          return response;
        });
      },
      update:function(cartId,data){
        return $http.patch(API.baseURL+"carts/"+cartId,data);
      },
      addToCart:function(cartId,data){
        return $http.post(API.baseURL+"carts/"+cartId+"/rentals",data).then(function(response){
          if(response.data && response.data.data){
            $rootScope.$broadcast("BG:System:CartCount",response.data.data.rental_products.length);
          }
          return response;
        });
      },
      removeItem:function(cartId,id){
        //https://api.marketplace.com/v1/carts/cart_id/
        return $http.delete(API.baseURL+"carts/"+cartId+"/rentals/"+id);
      },
      updateItem:function(cartId,id,data){
        return $http.patch(API.baseURL+"carts/"+cartId+"/rentals/"+id,data)
      },
      checkout:function(cartId){
        //https://api.marketplace.com/v1/cart/cart_id/actions/checkout
        return $http.put(API.baseURL+"carts/"+cartId+"/actions/checkout");
      }
    }
  }
);