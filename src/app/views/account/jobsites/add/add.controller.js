angular.module('BG').controller('AddJobsiteCtrl',
  /** @ngInject */
    function ($scope, $state, $timeout, $stateParams, JobsitesService, SystemService) {
    var mdl = $scope.mdl = {};
    mdl.data = {
      kind: "job_site"
    };

    mdl.kinds = {
      "job_site": "Job site",
      "billing": "Billing"
    };

    $scope.editMode = $state.current.name == "main.account.jobsites.edit";

    mdl.countries = [];
    mdl.states = [];
    mdl.cities = [];

    if ($scope.editMode) {
      $timeout(function(){
        $scope.$broadcast("LI:Loading",true);
      });
      JobsitesService.getSite($scope.user.id, $stateParams.id).then(function (response) {
        $scope.$broadcast("LI:Loading",false);
        var data = mdl.data = response.data.data;
        data.country = ""+data.country.id;
        data.state = ""+data.state.id;
        data.city = ""+data.city.id;
        if(marker){
          if(data && data.coord && data.coord.coordinates){
            var lat=data.coord.coordinates[0];
            var lng=data.coord.coordinates[1];
            var pos=new google.maps.LatLng(lat,lng);
            marker.setPosition(pos);
          }
        }
      })
    }


    SystemService.getCountries().then(function (response) {
      mdl.countries = response.data.data;
      //mdl.data.country=Object.keys(mdl.countries)[0];
    });


    $scope.$watch("mdl.data.country", function (newValue, oldValue) {
      if (newValue) {
        SystemService.getStates(mdl.data.country).then(function (response) {
          mdl.states = response.data.data;
          //mdl.data.state=Object.keys(mdl.states)[0];

        });
      }
    });

    $scope.$watch("mdl.data.state", function (newValue, oldValue) {
      if (newValue) {
        SystemService.getCities(mdl.data.country, mdl.data.state).then(function (response) {
          mdl.cities = response.data.data;
          //mdl.data.city=Object.keys(mdl.cities)[0];
        });
      }
    });

    $scope.add = function () {
      $scope.$broadcast("validation", true);

      if (mdl.form.$valid) {
        $scope.buttonLoader = true;
        if($scope.editMode){
          JobsitesService.updateSite($scope.user.id,mdl.data.id, mdl.data).then(function (response) {
            console.log("Response", response);
            $scope.buttonLoader = false;
            $state.go("main.account.jobsites.list")
          })
        }else{
          JobsitesService.addSite($scope.user.id, mdl.data).then(function (response) {
            $scope.buttonLoader = false;
            console.log("Response", response);
            $state.go("main.account.jobsites.list")
          })
        }

      }
    };

    function markerPositionChanged(marker){
      console.log("marker",marker.getPosition());
      var p=marker.getPosition();
//      "coord": {
//        "type": "Point",
//          "coordinates": [
//          -5,
//          -4
//        ]
//      },
      mdl.data.coord={
        type:"Point",
        coordinates:[
          p.lat(),
          p.lng()
        ]
      };
    }


    /* map */
    var gmap = null;
    var marker = null;
    $scope.$on('mapInitialized', function (event, map) {
      gmap = map;
      map.setZoom(12);


//      var infowindow = new google.maps.InfoWindow({
//        content: '<h1>Equipment Name</h1>' +
//          '<img style="height:100px;" src="http://pixabay.com/static/uploads/photo/2015/06/26/19/01/heavy-equipment-822833_640.jpg"/>' +
//          '<br/><b>Sample Content</b> <i>We can add anything here</i>'
//      });

      var lat=-34,lng=151;

      if(mdl.data && mdl.data.coord && mdl.data.coord.coordinates){
           lat=mdl.data.coord.coordinates[0];
           lng=mdl.data.coord.coordinates[1];
      }

      marker = new google.maps.Marker({
        position: new google.maps.LatLng(lat,lng),
        map: map,
        draggable: true,
        animation: google.maps.Animation.DROP
      });

      google.maps.event.addListener(marker, 'dragend', function() {
        markerPositionChanged(marker);
      });

//      google.maps.event.addListener(marker, 'click', function () {
//        infowindow.open(map, marker);
//      });

      map.setCenter(new google.maps.LatLng(lat,lng));
      google.maps.event.addListener(map, 'click', function (event) {
        console.log("zoom", map.getZoom());
        placeMarker(event.latLng);
      });

      var input = document.createElement("input");
      input.className = "pac-input";
      map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

      var searchBox = new google.maps.places.SearchBox((input));

      google.maps.event.addListener(searchBox, 'places_changed', function () {
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
        markerPositionChanged(marker);
      }
    });





  });