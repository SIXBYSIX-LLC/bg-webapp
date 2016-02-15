angular.module('BG').factory('InquiriesService',

  /** @ngInject */
    function (API,$http) {
    return {
      getInquiries:function(){
        return $http.get(API.baseURL+"inquiries");
      },
      getInquiry:function(id){
        return $http.get(API.baseURL+"inquiries").then(function(response){
          var items=response.data.data;
          for(var i=0;i<items.length;i++){
            if(items[i].id==id){
              return items[i];
            }
          }
          return null;
        });
      },
      addInquiry:function(data){
        return $http.post(API.baseURL+"inquiries",data);
      },
      getMessages:function(id){
        //https://api.marketplace.com/v1/inquiries/id/messages
        return $http.get(API.baseURL+"inquiries/"+id+"/messages");
      },
      sendMessage:function(id,data){
        return $http.post(API.baseURL+"inquiries/"+id+"/messages",data);
      }
    }
  }
);