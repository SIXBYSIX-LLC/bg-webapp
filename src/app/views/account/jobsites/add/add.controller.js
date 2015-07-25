angular.module('BG').controller('AddJobsiteCtrl',
  /** @ngInject */
    function ($scope, $state, JobsitesService, SystemService) {
    var mdl = $scope.mdl = {};
    mdl.data={
      kind:"job_site"
    };

    mdl.kinds={
      "job_site":"Job site",
      "billing":"Billing"
    };

    mdl.countries=[];
    mdl.states=[];
    mdl.cities=[];

    SystemService.getCountries().then(function(response){
      mdl.countries=response.data.data;
      //mdl.data.country=Object.keys(mdl.countries)[0];
    });


    $scope.$watch("mdl.data.country",function(newValue,oldValue){
      if(newValue){
        SystemService.getStates(mdl.data.country).then(function(response){
          mdl.states=response.data.data;
          //mdl.data.state=Object.keys(mdl.states)[0];

        });
      }
    });

    $scope.$watch("mdl.data.state",function(newValue,oldValue){
      if(newValue){
        SystemService.getCities(mdl.data.country,mdl.data.state).then(function(response){
          mdl.cities=response.data.data;
          //mdl.data.city=Object.keys(mdl.cities)[0];
        });
      }
    });

    $scope.add=function(){
      $scope.$broadcast("validation",true);

      if(mdl.form.$valid){
        JobsitesService.addSite($scope.user.id,mdl.data).then(function(response){
          console.log("Response",response);
          $state.go("main.account.jobsites.list")
        })
      }
    }


  });