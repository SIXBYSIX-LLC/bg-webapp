angular.module('BG').controller('ListJobsitesCtrl',
  /** @ngInject */
  function ($scope, JobsitesService) {
    var mdl = $scope.mdl = {};
    JobsitesService.getSites($scope.user.id).then(function(response){
      mdl.sites=response.data.data;
    });


  });