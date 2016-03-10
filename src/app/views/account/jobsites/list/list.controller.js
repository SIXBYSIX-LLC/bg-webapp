angular.module('BG').controller('ListJobsitesCtrl',
  /** @ngInject */
  function ($scope, JobsitesService) {
    var mdl = $scope.mdl = {};
    JobsitesService.getSites($scope.user.id).then(function(response){
      mdl.sites=response.data.data;
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