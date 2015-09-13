angular.module('BG').factory("SystemService",
  /** @ngInject */
   function(API,$http){
    return {
      getCountries:function(){
        return $http.get(API.baseURL+"system/countries");
      },
      getStates:function(country_id){
        return $http.get(API.baseURL+"system/countries/"+country_id+"/regions");
      },
      getCities:function(country_id,state_id){
        return $http.get(API.baseURL+"system/countries/"+country_id+"/regions/"+state_id+"/cities");
      },
      getUser:function(id){
        //https://api.marketplace.com/v1/users/id
        return $http.get(API.baseURL+"users/"+id);
      }
    }
   }
);