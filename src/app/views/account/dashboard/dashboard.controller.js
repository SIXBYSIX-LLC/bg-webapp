angular.module('BG').controller('DashboardCtrl',
  /** @ngInject */
    function ($scope, JobsitesService,EquipmentsService) {
    var mdl = $scope.mdl = {};
    mdl.jobSitesCount = 0;
    JobsitesService.getSitesCount($scope.user.id).then(function (count) {
      mdl.jobSitesCount = count;
    });
    EquipmentsService.getFavoriteProductsCount($scope.user.id).then(function(count){
      mdl.favoriteCount=count;
    });
  }
);