angular.module('BG').controller('AddEquipmentCtrl',
  /** @ngInject */
  function ($scope, $q, API, $state, $stateParams, EquipmentsService, JobsitesService, SystemService, Upload) {

    $scope.editMode = ($state.current.name == "main.account.equipments.edit" || $state.current.name == "main.sellerAccount.equipments.edit");

    var addEquiMdl = $scope.addEquiMdl = {};

    addEquiMdl.category1 = addEquiMdl.category2 = addEquiMdl.category3 = null;


    if ($scope.editMode) {
      EquipmentsService.getEquipment($stateParams.id).then(function (response) {
        //console.log(response.data.data);
        addEquiMdl.data = response.data.data;
        addEquiMdl.tags = [];
        angular.forEach(addEquiMdl.data.tags, function (tag) {
          addEquiMdl.tags.push({text: tag});
        });
        var count = 1;
        angular.forEach(addEquiMdl.data.category.hierarchy, function (value) {
          addEquiMdl["category" + count] = value;
          count++;
        });
        addEquiMdl["category" + count] = addEquiMdl.data.category.id;
        addEquiMdl.data.location = addEquiMdl.data.location.id;
      })
    } else {
      addEquiMdl.data = {
        daily_price: 0,
        weekly_price: 0,
        monthly_price: 0,
        selling_price: 0,
        condition: "new",
        location: 7
      };

    }

    EquipmentsService.getCategories().then(function (response) {
      addEquiMdl.categories1 = response.data.data;
      addEquiMdl.categories2 = null;
      addEquiMdl.categories3 = null;
      $scope.editMode || (addEquiMdl.category1 = addEquiMdl.category2 = addEquiMdl.category3 = null);
    });
    JobsitesService.getSitesLimited($scope.user.id).then(function (response) {
      addEquiMdl.sites = response.data.data;
    });


    $scope.$watch("addEquiMdl.category1", function (newValue) {
      if (newValue) {
        EquipmentsService.getCategories(newValue).then(function (response) {
          addEquiMdl.categories2 = response.data.data;
        });
        addEquiMdl.categories3 = null;
        $scope.editMode || (addEquiMdl.category2 = addEquiMdl.category3 = null);
      }
    });
    $scope.$watch("addEquiMdl.category2", function (newValue) {
      if (newValue) {
        EquipmentsService.getCategories(newValue).then(function (response) {
          addEquiMdl.categories3 = response.data.data;
          $scope.editMode || (addEquiMdl.category3 = null);
        });

      }
    });

    $scope.deleteImage = function (i) {
      var img = addEquiMdl.data.images[i];
      EquipmentsService.deleteImage(img.id).then(function () {
        addEquiMdl.data.images.splice(i, 1);
      })
    };

    $scope.add = function () {
      $scope.$broadcast("validation", true);

      if (addEquiMdl.tags) {
        addEquiMdl.data.tags = [];
        angular.forEach(addEquiMdl.tags, function (obj) {
          addEquiMdl.data.tags.push(obj.text);
        })
      }
      addEquiMdl.data.category = addEquiMdl.category3 ? addEquiMdl.category3 : (addEquiMdl.category2 ? addEquiMdl.category2 : addEquiMdl.category1);
      if (addEquiMdl.form.$valid) {

        if ($scope.editMode) {
          EquipmentsService.updateEquipment(addEquiMdl.data.id, addEquiMdl.data).then(function (response) {
            uploadImages().then(function () {
              $state.go('main.sellerAccount.equipments.list');
            })
          });
        } else {
          EquipmentsService.addEquipment(addEquiMdl.data).then(function (response) {
            uploadImages().then(function () {
              $state.go('main.sellerAccount.equipments.list');
            })
          })
        }
      }

    };

    function uploadImages() {
      var deferred = $q.defer();
      var promises = [];
      angular.forEach(addEquiMdl.filesToUpload, function (file) {
        promises.push(upload(addEquiMdl.data.id, file));
      });
      $q.all(promises).then(function () {
        deferred.resolve();
      });
      return deferred.promise;
    }

    function upload(id, file) {
      var deferred = $q.defer();
      Upload.upload({
        url: API.baseURL + 'staticfiles',
        fields: {
          target: "catalog.Product.images",
          target_id: id
        },
        file: file
      }).progress(function (evt) {
        file.progress = parseInt(100.0 * evt.loaded / evt.total);
        file.status = "Uploading";
      }).success(function (data, status, headers, config) {
        file.status = "Uploaded";
        deferred.resolve();
      }).error(function (data, status, headers, config) {
        file.status = "Error";
        file.progress = 0;
        deferred.resolve();
      });
      return deferred.promise;

    }
  }
);
