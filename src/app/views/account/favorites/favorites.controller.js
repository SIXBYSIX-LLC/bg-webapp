angular.module('BG').controller('FavoritesCtrl',
  /** @ngInject */
    function ($scope, EquipmentsService) {
    var mdl = $scope.mdl = {};

    $scope.addBreadcrumb({title: "Favourites",state:"main.account.favorites"});
    $scope.$on("$stateChangeStart", function () {

      $scope.popBreadcrumb();

    });
    $scope.disableBreadcrumb(false);

    EquipmentsService.getFavoriteProducts($scope.user.id).then(function (response) {
      mdl.favorites = response.data.data;
    })

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
