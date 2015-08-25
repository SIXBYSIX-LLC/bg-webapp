angular.module('BG').factory('PaymentService',

  /** @ngInject */
    function (API,$http) {
    return {
      getToken:function(){
        return $http.get(API.baseURL+"paymentgateway/braintree/actions/generate_token");
      }
    }
  }
);