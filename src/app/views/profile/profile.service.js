angular.module('BG').factory('ProfileService',

  /** @ngInject */
    function (API,$http) {
    return {
      getUser:function(id){
        return $http.get(API.baseURL+"users/"+id);
      },
      updateUser:function(id,data){
        return $http.patch(API.baseURL+"users/"+id,data);
      }
    }
  }
);