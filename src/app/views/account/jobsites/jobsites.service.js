angular.module('BG').factory('JobsitesService',

  /** @ngInject */
    function (API,$http) {
    return {

      addSite:function(id,data){
        return $http.post(API.baseURL+"users/"+id+"/addresses",data);
      },
      updateSite:function(userId,id,data){
        return $http.patch(API.baseURL+"users/"+id+"/addresses",data);
      },
      deleteSite:function(userId,id){
        return $http.delete(API.baseURL+"users/"+userId+"/addresses/"+id);
      },
      getSite:function(userId,id){
        return $http.get(API.baseURL+"users/"+userId+"/addresses/"+id);
      },
      getSites:function(id){
        return $http.get(API.baseURL+"users/"+id+"/addresses?kind=job_site");
      },
      getSitesLimited:function(id){
        return $http.get(API.baseURL+"users/"+id+"/addresses?kind=job_site&fields=id,name");
      }
    }
  }
);