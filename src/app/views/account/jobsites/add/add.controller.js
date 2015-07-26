angular.module('BG').controller('AddJobsiteCtrl',
  /** @ngInject */
    function ($scope, $state, $stateParams, JobsitesService, SystemService) {
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
      JobsitesService.getSite($scope.user.id, $stateParams.id).then(function (response) {
        var data = mdl.data = response.data.data;
        data.country = ""+data.country.id;
        data.state = ""+data.state.id;
        data.city = ""+data.city.id;
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
        if($scope.editMode){
          JobsitesService.updateSite($scope.user.id,mdl.data.id, mdl.data).then(function (response) {
            console.log("Response", response);
            $state.go("main.account.jobsites.list")
          })
        }else{
          JobsitesService.addSite($scope.user.id, mdl.data).then(function (response) {
            console.log("Response", response);
            $state.go("main.account.jobsites.list")
          })
        }

      }
    }


  });