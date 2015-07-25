angular.module('BG').controller('AddEquipmentCtrl',
  /** @ngInject */
    function ($scope,$state,$stateParams,EquipmentsService,JobsitesService,SystemService,Upload) {


    var addEquiMdl = $scope.addEquiMdl = {
      data:{
        daily_price:0,
        weekly_price:0,
        monthly_price:0,
        selling_price:0,
        condition:"new",
        location:7
      }
    };



    if($state.current.name=="main.account.equipments.edit"){
      EquipmentsService.getEquipment($stateParams.id).then(function(response){
        addEquiMdl.data = response.data.data;
        addEquiMdl.tags=[];
        angular.forEach(addEquiMdl.data.tags,function(tag){
          addEquiMdl.tags.push({text:tag});
        })
      })
    }


    addEquiMdl.category1=addEquiMdl.category2=addEquiMdl.category3=null;


    EquipmentsService.getCategories().then(function(response){
      addEquiMdl.categories1=response.data.data;
      addEquiMdl.categories2=null;
      addEquiMdl.categories3=null;
      addEquiMdl.category1=addEquiMdl.category2=addEquiMdl.category3=null;
    });

    JobsitesService.getSitesLimited($scope.user.id).then(function(response){
      addEquiMdl.sites=response.data.data;
    });

    $scope.$watch("addEquiMdl.category1",function(newValue){
      if(newValue){
        EquipmentsService.getCategories(newValue).then(function(response){
          addEquiMdl.categories2=response.data.data;
        });
        addEquiMdl.categories3=null;
        addEquiMdl.category2=addEquiMdl.category3=null;
      }
    });
    $scope.$watch("addEquiMdl.category2",function(newValue){
      if(newValue){
        EquipmentsService.getCategories(newValue).then(function(response){
          addEquiMdl.categories3=response.data.data;
          addEquiMdl.category3=null;
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
      addEquiMdl.data.category = addEquiMdl.category3  ? addEquiMdl.category3 : (addEquiMdl.category2 ? addEquiMdl.category2 : addEquiMdl.category1);
      console.log(addEquiMdl.data);
      if(addEquiMdl.form.$valid){
        EquipmentsService.addEquipment(addEquiMdl.data);
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