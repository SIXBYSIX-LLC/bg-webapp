angular.module('BG').factory('HomeService',

  /** @ngInject */
  function (API,$http) {
    return {
      getCategories:function(){
        return $http.get(API.baseURL+"categories?parent__isnull=True");
      },
      getRecent:function(){
        return $http.get(API.baseURL+"products?is_active=true&order_by=id");//ToDO: change url with recent API
      }
    }
  }
);
