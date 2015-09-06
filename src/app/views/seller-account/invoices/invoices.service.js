angular.module('BG').factory('SellerInvoicesService',

  /** @ngInject */
    function (API,$http) {
    return {
      getInvoices:function(){
        //return $http.get(API.baseURL+"orderlines");
      },
      getInvoice:function(id){
        //return $http.get(API.baseURL+"orderlines/"+id);
      }
    }
  }
);