angular.module('BG').controller('SellerInvoiceListCtrl',
  /** @ngInject */
    function ($scope,SellerInvoicesService) {

    var mdl = $scope.mdl = {};
    SellerInvoicesService.getInvoices().then(function(response){
      mdl.items = response.data.data;
    });

    $scope.searchOpen = false;
    $scope.filterOpen = false;
    $scope.searchBar = function() {
    	$scope.searchOpen = !$scope.searchOpen;
    }

    $scope.filterBar = function() {
    	$scope.filterOpen = !$scope.filterOpen;
    }


  });