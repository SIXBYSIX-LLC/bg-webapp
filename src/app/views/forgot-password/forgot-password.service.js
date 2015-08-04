angular.module('BG').factory('ForgotPasswordService',

  /** @ngInject */
    function (API,$http) {
    return {
      reset:function(data){
        return $http.post(API.baseURL+"users/actions/password_reset",data);
      }
    }
  }
);