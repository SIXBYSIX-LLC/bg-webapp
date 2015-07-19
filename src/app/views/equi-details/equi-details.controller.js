angular.module('BG').controller('EquiDetailsCtrl',
  /** @ngInject */
    function ($scope, $state, $stateParams, EquiDetailsService) {
    var mdl = $scope.mdl = {};
    $scope.mainMdl.title = "Equipment Details";
    $scope.addBreadcrumb({title: "Equipment Details"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });
    if ($stateParams.id) {
      EquiDetailsService.getDetails($stateParams.id).then(function (response) {
        mdl.equi = response.data.data;
      });
    }

    mdl.tab1="photos";
    mdl.tab2="description";
    mdl.map = {
      center:{latitude: 40.47,longitude: -73.85},
      zoom: 8,
      markers: [
        {id: 0,coords: {latitude: 41,longitude: -75},title: "Marker 1"},
        {id: 1,coords: {latitude: 40,longitude: -74.5},title: "Marker 2"}],
      polyline: {
        path: [{latitude: 41,longitude: -75},
          {latitude: 40,longitude: -74.5},
          {latitude: 40.47,longitude: -73.85},
          {latitude: 41.2,longitude: -74.2}],
        clickable: !0,
        editable: !0,
        geodesic: !0,
        draggable: !0
      }
    };

  }
);