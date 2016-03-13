angular.module('BG').controller('DashboardCtrl',
  /** @ngInject */
    function ($scope, JobsitesService,EquipmentsService,OrdersService) {
    var mdl = $scope.mdl = {};
    mdl.jobSitesCount = 0;
    JobsitesService.getSitesCount($scope.user.id).then(function (count) {
      mdl.jobSitesCount = count;
    });
    EquipmentsService.getFavoriteProductsCount($scope.user.id).then(function(count){
      mdl.favoriteCount=count;
    });
    OrdersService.getOrders().then(function(response){

      mdl.rentedCount=0;
      for(var i=0; i<response.data.data.length;i++){
        mdl.rentedCount+=response.data.data[i].items.length;
      }

    });
  }
);
