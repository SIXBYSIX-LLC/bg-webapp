angular.module('BG').factory('CartService',

  /** @ngInject */
    function (API,$http) {
    return {
      getCurrent:function(){
        return $http.get(API.baseURL+"carts/current");
      },
      addToCart:function(cartId,data){
        return $http.post(API.baseURL+"carts/"+cartId+"/rentals",data)
      }
    }
  }
);