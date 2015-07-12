angular.module('BG').factory('EquiDetailsService',

  /** @ngInject */
    function (API,$http) {
    return {
      getDetails:function(id){
        return $http.get(API.baseURL+"/products/"+id);
      }
    }
  }
);