angular.module('BG').factory('PaymentService',

  /** @ngInject */
    function (API,$http) {
    return {
      getToken:function(){
        return $http.get(API.baseURL+"paymentgateway/braintree/actions/generate_token");
      },
      payInvoice:function(id,nonce){
        //Invoice / Paying the Invoice / Paying the Invoice POSThttps://api.marketplace.com/v1/invoices/id/actions/pay
        return $http.post(API.baseURL+"invoices/"+id+"/actions/pay",{
          gateway:'postpaid',
          return_url:document.URL+"?123",
          nonce:nonce
        });
      }
    }
  }
);