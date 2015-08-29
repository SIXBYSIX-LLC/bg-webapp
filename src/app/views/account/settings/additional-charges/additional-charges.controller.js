angular.module('BG').controller('SettingsAdditionalChargesCtrl',
  /** @ngInject */
    function ($scope,API,SettingsService,EquipmentsService) {
    var chargesMdl = $scope.chargesMdl = {};
    chargesMdl.addData={
      name:'',
      value:0,
      unit:'flat',//pct
      item_kind:'rental',
      categories:[]
    };

    EquipmentsService.getAllCategories().then(function(response){
      chargesMdl.categories=response.data.data;
      angular.forEach(chargesMdl.categories,function(cat){
        cat.text = cat.name;
      });
      getCharges();
    });





    function getCharges(){
      SettingsService.getAdditionalChargesRules().then(function (response) {
        chargesMdl.charges = response.data.data;
        angular.forEach(chargesMdl.charges,function(charge){
          charge.categoryNames=[];
          for(var i=0;i<charge.categories.length;i++){
            for(var j=0;j<chargesMdl.categories.length;j++){
              if(chargesMdl.categories[j].id==charge.categories[i]){
                charge.categoryNames.push(chargesMdl.categories[j].name);
                break;
              }
            }
          }
        })
      });
    }


    chargesMdl.edit = function (charge) {
      charge.edit=true;
      chargesMdl.editData=angular.copy(charge);
      chargesMdl.selectedCatsToEdit=[];
      angular.forEach(chargesMdl.editData.categories,function(cat){
        for(var j=0;j<chargesMdl.categories.length;j++){
          if(chargesMdl.categories[j].id==cat){
            chargesMdl.selectedCatsToEdit.push(chargesMdl.categories[j]);
            break;
          }
        }

      })
    };
    chargesMdl.delete = function (charge) {
      SettingsService.deleteAdditionalCharge(charge.id).then(function(){
        $scope.$emit('BG:System:TopMessage',{
          text:'Charge deleted'
        });
        getCharges();
      })
    };

    chargesMdl.cancelEdit = function (charge) {
      charge.edit = false;
    };

    chargesMdl.add = function (rule) {
      $scope.$broadcast("validateAddForm", true);
      if(chargesMdl.addForm.$valid){
        chargesMdl.addData.categories = [];
        if(chargesMdl.selectedCatsToAdd){
            angular.forEach(chargesMdl.selectedCatsToAdd,function(cat){
              if(cat && cat.id){
                chargesMdl.addData.categories.push(cat.id);
              }
            })
        }

        SettingsService.addAdditionalCharge(chargesMdl.addData).then(function(){
          $scope.$emit('BG:System:TopMessage',{
            text:'Charge Added'
          });
          chargesMdl.addData={
            name:'',
            value:0,
            unit:'flat',//pct
            item_kind:'rental',
            categories:[]
          };
          chargesMdl.selectedCatsToAdd=[];
          getCharges();
        })
      }
    };

    chargesMdl.update = function (charge) {
      $scope.$broadcast("validateEditForm", true);
      if(chargesMdl.editForm.$valid){
        chargesMdl.editData.categories = [];
        if(chargesMdl.selectedCatsToEdit){
          angular.forEach(chargesMdl.selectedCatsToEdit,function(cat){
            if(cat && cat.id){
              chargesMdl.editData.categories.push(cat.id);
            }
          })
        }

        SettingsService.updateAdditionalCharge(charge.id,chargesMdl.editData).then(function(){
          $scope.$emit('BG:System:TopMessage',{
            text:'Charge Updated'
          });
          getCharges();
        })
      }
    };




  });