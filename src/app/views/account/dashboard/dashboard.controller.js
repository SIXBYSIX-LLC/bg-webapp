angular.module('BG').controller('DashboardCtrl',
  /** @ngInject */
    function ($scope, JobsitesService) {
    var mdl = $scope.mdl = {};
    mdl.jobSitesCount = 0;
    JobsitesService.getSitesCount($scope.user.id).then(function (count) {
      mdl.jobSitesCount = count;
    })
  }
);