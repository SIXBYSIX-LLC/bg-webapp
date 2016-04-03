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
      mdl.orders=response.data.data;

      mdl.rentedCount=0;
      for(var i=0; i<mdl.orders.length;i++){
        mdl.rentedCount+=mdl.orders[i].items.length;
        for(var j=0;j<mdl.orders[i].items.length;j++){
          //console.log(mdl.orders[i].items[j]);
          mdl.orders[i].total+=mdl.orders[i].items[j].subtotal;

        }
      }


    });
  }
);
