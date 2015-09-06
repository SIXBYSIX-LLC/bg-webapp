angular.module('BG').factory('InquiriesService',

  /** @ngInject */
    function (API,$http) {
    return {
      getInquiries:function(){
        return $http.get(API.baseURL+"inquiries");
      }
    }
  }
);