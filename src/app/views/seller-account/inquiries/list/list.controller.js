angular.module('BG').controller('InquiryListCtrl',
  /** @ngInject */
    function ($scope,InquiriesService) {

    var mdl = $scope.mdl = {};
    $scope.addBreadcrumb({title: "Enquiry",state:"main.sellerAccount.inquiries.list"});
    $scope.$on("$stateChangeStart", function () {

      $scope.popBreadcrumb();
    });
    InquiriesService.getInquiries().then(function(response){
      mdl.items =  response.data.data;
    });
    $scope.searchOpen = false;
    $scope.searchBar = function() {
    	$scope.searchOpen = !$scope.searchOpen;
    }

    $scope.mobilesearchOpen = false;
      $scope.mobilesearchBar = function() {
      	$scope.mobilesearchOpen = !$scope.mobilesearchOpen;
      	$scope.mobilefilterOpen = false;
      }
  });
