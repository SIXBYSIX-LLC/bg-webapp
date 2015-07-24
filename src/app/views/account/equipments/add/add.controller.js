angular.module('BG').controller('AddEquipmentCtrl',
  /** @ngInject */
    function ($scope,EquipmentsService,SystemService,Upload) {

    var addEquiMdl = $scope.addEquiMdl = {
      data:{
        daily_price:0,
        weekly_price:0,
        monthly_price:0,
        selling_price:0,
        condition:"new"
      }
    };


    addEquiMdl.countries=[];
    addEquiMdl.states=[];
    addEquiMdl.cities=[];
    SystemService.getCountries().then(function(response){
      addEquiMdl.countries=response.data.data;
    });



    $scope.$watch("addEquiMdl.countryId",function(newValue,oldValue){
      if(newValue){
        SystemService.getStates(addEquiMdl.countryId).then(function(response){
          addEquiMdl.states=response.data.data;
        });
      }
    });

    $scope.$watch("addEquiMdl.stateId",function(newValue,oldValue){
      if(newValue){
        SystemService.getCities(addEquiMdl.countryId,addEquiMdl.stateId).then(function(response){
          addEquiMdl.cities=response.data.data;
        });
      }
    });

    EquipmentsService.getCategories().then(function(response){
      addEquiMdl.categories1=response.data.data;
      addEquiMdl.categories2=null;
      addEquiMdl.categories3=null;
    });

    $scope.$watch("addEquiMdl.data.category1",function(newValue){
      if(newValue){
        EquipmentsService.getCategories(newValue).then(function(response){
          addEquiMdl.categories2=response.data.data;
        });
        addEquiMdl.categories3=null;
      }
    });
    $scope.$watch("addEquiMdl.data.category2",function(newValue){
      if(newValue){
        EquipmentsService.getCategories(newValue).then(function(response){
          addEquiMdl.categories3=response.data.data;
        });

      }
    });

    $scope.add=function(){
      $scope.$broadcast("validation",true);

      if(addEquiMdl.tags){
        addEquiMdl.data.tags=[];
        angular.forEach(addEquiMdl.tags,function(obj){
          addEquiMdl.data.tags.push(obj.text);
        })
      }
      console.log(addEquiMdl.data);
      if(addEquiMdl.form.$valid){
        console.log("Valid");
      }
    };

    function upload(files){
      if(files && files[0]){
        console.log("files",files);
        angular.forEach(files,function(file){
          Upload.upload({
            url: API.baseURL+'staticfiles',
            fields:{
              target:"catalog.Product.images",
              target_id:5
            },
            file: files
          }).progress(function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.file.name);
          }).success(function (data, status, headers, config) {
            console.log('file ' + config.file.name + 'uploaded. Response: ' + data);
          }).error(function (data, status, headers, config) {
            console.log('error status: ' + status);
          })
        });

      }

    };
  }
);