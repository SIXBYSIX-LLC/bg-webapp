angular.module('BG').controller('ListInvoicesCtrl',
  /** @ngInject */
    function ($scope, InvoicesService) {
    var mdl = $scope.mdl = {};
    InvoicesService.getInvoices().then(function(response){
      mdl.invoices=response.data.data;
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