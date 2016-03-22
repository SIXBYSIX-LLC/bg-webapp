angular.module('BG').controller('SellerInvoiceListCtrl',
  /** @ngInject */
  function ($scope, SellerInvoicesService) {

    var mdl = $scope.mdl = {};
    $scope.addBreadcrumb({title: "Invoices",state:"main.sellerAccount.invoices.list"});
    $scope.$on("$stateChangeStart", function () {

      $scope.popBreadcrumb();
    });

    $scope.myDateRange = {startDate: moment(0), endDate: moment()};
    mdl.ranges = {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract('days', 1), moment().subtract('days', 1)],
      'Last 7 days': [moment().subtract('days', 7), moment()],
      'Last 30 days': [moment().subtract('days', 30), moment()],
      'This month': [moment().startOf('month'), moment().endOf('month')],
      'Reset': [moment(0), moment()]
    };
    SellerInvoicesService.getInvoices().then(function (response) {
      mdl.items = response.data.data;
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
