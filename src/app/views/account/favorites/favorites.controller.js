angular.module('BG').controller('FavoritesCtrl',
  /** @ngInject */
    function ($scope, EquipmentsService) {
    var mdl = $scope.mdl = {};


    EquipmentsService.getFavoriteProducts($scope.user.id).then(function (response) {
      mdl.favorites = response.data.data;
    })


  });