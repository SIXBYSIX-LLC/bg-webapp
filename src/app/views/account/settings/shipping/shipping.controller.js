angular.module('BG').controller('SettingsShippingCtrl',
  /** @ngInject */
    function ($scope, SettingsService, SystemService, JobsitesService) {



    var shippingMdl = $scope.shippingMdl = {};
    function getRules(){
      SettingsService.getShippingRules().then(function (response) {
        shippingMdl.rules = response.data.data;
        angular.forEach(shippingMdl.rules,function(rule){
          rule.country=""+rule.country;
        })
      });
    }

    JobsitesService.getSites($scope.user.id).then(function(response){
      shippingMdl.jobSites=response.data.data;
    });

    SystemService.getCountries().then(function (response) {
      shippingMdl.countries = response.data.data;
      //mdl.data.country=Object.keys(mdl.countries)[0];
    });
    getRules();

    shippingMdl.edit = function (rule) {
      rule.edit=true;
      shippingMdl.editData=angular.copy(rule);
    };
    shippingMdl.delete = function (rule) {
    };

    shippingMdl.cancelEdit = function (rule) {
      rule.edit = false;
    };
    shippingMdl.add = function (rule) {
      $scope.$broadcast("validateAddForm", true);
      if(shippingMdl.addForm.$valid){
        shippingMdl.addData.user = $scope.user.id;
        SettingsService.addShippingRule(shippingMdl.addData).then(function(){
          $scope.$emit('BG:System:TopMessage',{
            text:'Rule Added'
          });
          getRules();
        })
      }
    };
    shippingMdl.update = function (rule) {
      $scope.$broadcast("validateEditForm", true);
      console.log(shippingMdl.updateForm.$valid,shippingMdl.updateForm.$error);
      if(shippingMdl.updateForm.$valid){
        SettingsService.updateShippingRule(rule.id,shippingMdl.editData).then(function(){
          $scope.$emit('BG:System:TopMessage',{
            text:'Rule updated'
          });
          getRules();
        })
      }
    };

  });