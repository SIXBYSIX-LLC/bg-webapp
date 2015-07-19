angular.module('BG').controller('EquiDetailsCtrl',
  /** @ngInject */
    function ($scope, $state, $timeout, $stateParams, EquiDetailsService) {
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

    mdl.tab1="map";
    mdl.tab2="description";
    mdl.map = {
      center:{latitude: 39.47014384191681, longitude: -79.45778808593752},
      zoom: 10,
      control:{},
      markers: [
        {id: 0,coords: {latitude: 39.456706494450006,longitude: -79.75751953125002},title: "Marker 1"},
        {id: 1,coords: {latitude: 39.586706494450006,longitude: -79.05751953125002},title: "Marker 2"}]
    };
    $scope.$watch("mdl.tab1",function(newVal,oldVal){
      if(newVal=="map"){
        $timeout(function(){
          window.k=mdl.map.control;
          mdl.map.center={latitude: 39.47014384191681, longitude: -79.45778808593752};
          mdl.map.control.refresh && mdl.map.control.refresh() ;
        },50);

      }
    });

  }
);