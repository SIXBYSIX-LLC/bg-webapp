angular.module('BG').factory('JobsitesService',

  /** @ngInject */
    function (API,$http) {
    return {

      addSite:function(id,data){
        return $http.post(API.baseURL+"users/"+id+"/addresses",data);
      },
      updateSite:function(userId,id,data){
        return $http.patch(API.baseURL+"users/"+userId+"/addresses/"+id,data);
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
      getSitesCount:function(id){
        return $http.get(API.baseURL+"users/"+id+"/addresses?kind=job_site&page_size=1&fields=id").then(function(response){
          return response.data.meta.count;
        });
      },
      getSitesLimited:function(id){
        return $http.get(API.baseURL+"users/"+id+"/addresses?kind=job_site&fields=id,name");
      }
    }
  }
);