angular.module('BG').controller('InquiryListCtrl',
  /** @ngInject */
    function ($scope,InquiriesService) {

    var mdl = $scope.mdl = {};
    InquiriesService.getInquiries().then(function(response){
      mdl.items =  response.data.data;
    });
    $scope.searchOpen = false;
    $scope.searchBar = function() {
    	$scope.searchOpen = !$scope.searchOpen;
    }
  });