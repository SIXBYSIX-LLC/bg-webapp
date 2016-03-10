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