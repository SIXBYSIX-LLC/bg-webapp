angular.module('BG').factory('HomeService',

  /** @ngInject */
  function (API,$http) {
    return {
      getCategories:function(){
        return $http.get(API.baseURL+"categories?parent=1&parent__isnull=True");
      },
      getRecent:function(){
        return $http.get(API.baseURL+"categories?parent=1&parent__isnull=True");//ToDO: change url with recent API
      }
    }
  }
);
