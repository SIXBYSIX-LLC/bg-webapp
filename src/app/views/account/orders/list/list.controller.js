angular.module('BG').controller('ListOrdersCtrl',
  /** @ngInject */
    function ($scope, OrdersService) {
    var mdl = $scope.mdl = {};
    $scope.myDateRange={startDate:moment(0),endDate:moment()};


    $scope.addBreadcrumb({title: "Orders",state:"main.account.orders"});

    $scope.$on("$stateChangeStart", function () {

      $scope.popBreadcrumb();

    });
    $scope.disableBreadcrumb(false);

    mdl.ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
      'Last 7 days': [moment().subtract('days', 7), moment()],
      'Last 30 days': [moment().subtract('days', 30), moment()],
      'This month': [moment().startOf('month'), moment().endOf('month')],
      'Reset': [moment(0), moment()]

    };
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

    $scope.searchOpen = false;
      $scope.filterOpen = false;
      $scope.searchBar = function() {
      	$scope.searchOpen = !$scope.searchOpen;
      }

      $scope.filterBar = function() {
      	$scope.filterOpen = !$scope.filterOpen;
      }

      $scope.mobilesearchOpen = false;
      $scope.mobilefilterOpen = false;
      $scope.mobilesearchBar = function() {
      	$scope.mobilesearchOpen = !$scope.mobilesearchOpen;
      	$scope.mobilefilterOpen = false;
      }

      $scope.mobilefilterBar = function() {
      	$scope.mobilefilterOpen = !$scope.mobilefilterOpen;
      	$scope.mobilesearchOpen = false;
      }


  });
