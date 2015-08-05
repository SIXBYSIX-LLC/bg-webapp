angular.module('BG').controller('EquiDetailsCtrl',
  /** @ngInject */
    function ($scope, $state, $timeout, $stateParams, EquipmentsService, CartService,Dialog) {
    var mdl = $scope.mdl = {};
    $scope.mainMdl.title = "Equipment Details";
    $scope.addBreadcrumb({title: "Equipment Details"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });
    if ($stateParams.id) {
      $timeout(function(){
        $scope.$broadcast("LI:Loading",true);
      },5);
      EquipmentsService.getEquipment($stateParams.id).then(function (response) {
        $scope.$broadcast("LI:Loading",false);
        mdl.equi = response.data.data;
      });
    }

    mdl.tab1="map";
    mdl.tab2="description";

    $scope.addToCart = function(){
      $scope.$broadcast('PI:Process',true);
      var data={
        date_start:mdl.startDate,
        date_end:mdl.endDate,
        product:mdl.equi.id,
        shipping_kind:"pickup"
      };
      CartService.getCurrent().then(function(resp){
        if(resp.data && resp.data.data && resp.data.data.id){
          CartService.addToCart(resp.data.data.id,data).then(function(response){
            $scope.$broadcast('PI:Process',false);
            Dialog.info("Equipment added to cart")
          })
        }else{
          $scope.$broadcast('PI:Process',false);
        }

      });
    };


    var gmap=null;
    $scope.$on('mapInitialized', function(event, map) {
      gmap = map;
      map.setZoom(12);


      var infowindow = new google.maps.InfoWindow({
        content: '<h1>Equipment Name</h1>' +
          '<img style="height:100px;" src="http://pixabay.com/static/uploads/photo/2015/06/26/19/01/heavy-equipment-822833_640.jpg"/>'+
          '<br/><b>Sample Content</b> <i>We can add anything here</i>'
      });


      var marker = new google.maps.Marker({
        position: new google.maps.LatLng(-34, 151),
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

      google.maps.event.addListener(marker, 'click', function() {
        infowindow.open(map,marker);
      });

      map.setCenter(new google.maps.LatLng(-34, 151));
      google.maps.event.addListener(map, 'click', function(event) {
        console.log("zoom",map.getZoom());
        placeMarker(event.latLng);
      });

      var input = document.createElement("input");
      input.className="pac-input";
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var searchBox = new google.maps.places.SearchBox((input));

      google.maps.event.addListener(searchBox, 'places_changed', function() {
        var place = searchBox.getPlaces()[0];

        if (!place.geometry) return;

        if (place.geometry.viewport) {
          map.fitBounds(place.geometry.viewport);
        } else {
          map.setCenter(place.geometry.location);
          map.setZoom(16);
        }
      });

      function placeMarker(location) {
          marker.setPosition(location);
          marker.setAnimation(google.maps.Animation.DROP);
      }
    });
//    mdl.map = {
//      center:[39.47014384191681, -79.45778808593752],
//      zoom: 10,
//      control:{},
//      markers: [
//        {id: 0,coords: {latitude: 39.456706494450006,longitude: -79.75751953125002},title: "Marker 1"},
//        {id: 1,coords: {latitude: 39.586706494450006,longitude: -79.05751953125002},title: "Marker 2"}]
//    };
//    $scope.$watch("mdl.tab1",function(newVal,oldVal){
//      if(newVal=="map"){
//        $timeout(function(){
//          window.k=mdl.map.control;
//          mdl.map.center={latitude: 39.47014384191681, longitude: -79.45778808593752};
//          mdl.map.control.refresh && mdl.map.control.refresh() ;
//        },50);
//
//      }
//    });

    mdl.open = function($event,type) {
      mdl.openedStart = false;
      mdl.openedEnd = false;
      $event.preventDefault();
      $event.stopPropagation();

      mdl['opened'+type] = true;
    };
    mdl.minDate = mdl.minDate ? null : new Date();
    mdl.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.$on("$viewContentLoaded",function(){
      var cal = new Calendar();
      var unavailable_days = [17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
      var price_arr = {3: '$170', 4: '$170', 5: '$170', 6: '$170', 7: '$170', 8: '$170', 9: '$170', 10: '$170', 11: '$170', 12: '$170', 13: '$170', 14: '$170', 15: '$170', 16: '$170', 17: '$170'};

      var current_date = new Date();
      var current_year_month = (1900 + current_date.getYear()) + "-" + (current_date.getMonth() + 1);
      tjq("#select-month").find("[value='" + current_year_month + "']").prop("selected", "selected");
      cal.generateHTML(current_date.getMonth(), (1900 + current_date.getYear()), unavailable_days, price_arr);
      tjq(".calendar").html(cal.getHTML());

      tjq("#select-month").change(function() {
        var selected_year_month = tjq("#select-month option:selected").val();
        var year = parseInt(selected_year_month.split("-")[0], 10);
        var month = parseInt(selected_year_month.split("-")[1], 10);
        cal.generateHTML(month - 1, year, unavailable_days, price_arr);
        tjq(".calendar").html(cal.getHTML());
      });
    })

  }
);