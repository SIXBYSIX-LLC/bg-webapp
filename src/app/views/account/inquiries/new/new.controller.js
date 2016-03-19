angular.module('BG').controller('InquiryNewCtrl',
  /** @ngInject */
    function ($scope, $stateParams, InquiriesService, EquipmentsService, $state) {

    var mdl = $scope.mdl = {};
    EquipmentsService.getEquipment($stateParams.id).then(function (response) {
      $scope.$broadcast("LI:Loading", false);
      mdl.equi = response.data.data;
    });

    mdl.add = function(){
      $scope.$broadcast("validation", true);
      if(mdl.form.$valid){
        InquiriesService.addInquiry({
          product:$stateParams.id,
          subject:mdl.subject,
          text:mdl.text
        })
        $state.go("main.inquiries.list");
      }

    }

    $scope.back=function() {
      $state.go("main.equiDetails",{id:$stateParams.id});
    }

    $scope.editSub=function() {
      $scope.editSubject=!$scope.editSubject;
    }

  });