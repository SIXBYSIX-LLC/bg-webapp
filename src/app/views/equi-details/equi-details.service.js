angular.module('BG').factory('EquiDetailsService',

  /** @ngInject */
  function (API,$http) {
    return {
      getProductReview:function(productId){
        return $http.get(API.baseURL+"reviews?product="+productId);
      }
    }
  }
);
