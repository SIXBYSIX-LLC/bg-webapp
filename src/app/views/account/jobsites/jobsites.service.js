angular.module('BG').factory('JobsitesService',

  /** @ngInject */
    function (API,$http) {
    return {

      addSite:function(id,data){
        data.kind="job_site";
        return $http.post(API.baseURL+"users/"+id+"/addresses",data);
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