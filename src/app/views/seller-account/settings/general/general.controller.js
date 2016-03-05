angular.module('BG').controller('SettingsGeneralCtrl',
  /** @ngInject */
    function ($scope,API,SettingsService) {
      var generalMdl=$scope.generalMdl={};
      SettingsService.getUserSetting($scope.user.id).then(function(response){
        generalMdl.minimumContractPeriod=response.data.data.minimum_contract_period;
      });

      generalMdl.save=function(){
        $scope.$broadcast("validation", true);
        if(generalMdl.form.$valid){
          $scope.buttonLoader = true;
          SettingsService.updateUserSetting($scope.user.id,{
            'minimum_contract_period': parseInt(generalMdl.minimumContractPeriod)
          }).then(function(){
              $scope.buttonLoader = false;
              $scope.$emit('BG:System:TopMessage',{
                text:'Settings saved'
              });
          });

        }

      }
  });