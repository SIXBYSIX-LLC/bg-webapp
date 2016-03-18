angular.module('BG').controller('ListSellerOrdersCtrl',
  /** @ngInject */
  function ($scope, SellerOrdersService) {

    var mdl = $scope.mdl = {};
    $scope.myDateRange = {startDate: moment(0), endDate: moment()};
    mdl.ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
      'Last 7 days': [moment().subtract('days', 7), moment()],
      'Last 30 days': [moment().subtract('days', 30), moment()],
      'This month': [moment().startOf('month'), moment().endOf('month')],
      'Reset': [moment(0), moment()]
    };

    SellerOrdersService.getOrders().then(function (response) {
      mdl.orders = response.data.data;
    });

    $scope.searchOpen = false;
    $scope.filterOpen = false;
    $scope.searchBar = function () {
      $scope.searchOpen = !$scope.searchOpen;
    }

    $scope.filterBar = function () {
      $scope.filterOpen = !$scope.filterOpen;
    }

    $scope.mobilesearchOpen = false;
    $scope.mobilefilterOpen = false;
    $scope.mobilesearchBar = function () {
      $scope.mobilesearchOpen = !$scope.mobilesearchOpen;
      $scope.mobilefilterOpen = false;
    }

    $scope.mobilefilterBar = function () {
      $scope.mobilefilterOpen = !$scope.mobilefilterOpen;
      $scope.mobilesearchOpen = false;
    }

  });
