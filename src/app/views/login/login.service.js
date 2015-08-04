angular.module('BG').factory('LoginService',

  /** @ngInject */
    function (API,$http) {
    return {
      login:function(data){
        return $http.post(API.baseURL+"login",data);
      },
      logout:function(){
        return $http.get(API.baseURL+"logout");
      }
    }
  }
);