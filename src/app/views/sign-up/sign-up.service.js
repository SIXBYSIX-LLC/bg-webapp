angular.module('BG').factory('SignUpService',

  /** @ngInject */
  function (API,$http) {
    return {
      signUp:function(data){
        return $http.post(API.baseURL+"users",data);
      }
    }
  }
);