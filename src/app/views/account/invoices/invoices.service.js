angular.module('BG').factory('InvoicesService',

  /** @ngInject */
    function (API,$http) {
    return {
      getInvoices:function(){
        return $http.get(API.baseURL+"invoices");
      },
      getInvoice:function(id){
        return $http.get(API.baseURL+"invoices/"+id);
      }
    }
  }
);