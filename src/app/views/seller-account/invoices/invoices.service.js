angular.module('BG').factory('SellerInvoicesService',

  /** @ngInject */
    function (API,$http) {
    return {
      getInvoices:function(){
        return $http.get(API.baseURL+"invoicelines");
      },
      getInvoice:function(id){
        return $http.get(API.baseURL+"invoicelines/"+id);
      }
    }
  }
);