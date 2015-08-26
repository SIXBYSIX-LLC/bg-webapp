angular.module('BG').factory('SettingsService',

  /** @ngInject */
    function (API,$http) {
    return {
      getUserSetting:function(id){
        //v1/users/id/setting
        return $http.get(API.baseURL+"users/"+id+"/setting");
      },
      updateUserSetting:function(id,data){
        return $http.patch(API.baseURL+"users/"+id+"/setting",data);
      },
      getShippingRules:function(){
        return $http.get(API.baseURL+"settings/shipping/standard");
      },
      addShippingRule:function(data){
        return $http.post(API.baseURL+"settings/shipping/standard",data);
      },
      updateShippingRule:function(id,data){
        return $http.patch(API.baseURL+"settings/shipping/standard/"+id,data);
      },
      deleteShippingRule:function(id){
        //TODO:
      }
    }
  }
);