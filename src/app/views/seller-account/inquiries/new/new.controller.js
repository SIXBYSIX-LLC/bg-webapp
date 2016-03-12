angular.module('BG').controller('InquiryNewCtrl',
  /** @ngInject */
    function ($scope, $stateParams, InquiriesService, EquipmentsService) {

    var mdl = $scope.mdl = {};
    EquipmentsService.getEquipment($stateParams.id).then(function (response) {
      $scope.$broadcast("LI:Loading", false);
      mdl.equi = response.data.data;
    });

    mdl.add = function(){
      console.dir(InquiriesService.addInquiry);
      $scope.$broadcast("validation", true);
      //$scope.buttonLoader = true;
      if(mdl.form.$valid){
        InquiriesService.addInquiry({
          product:$stateParams.id,
          subject:mdl.subject,
          text:mdl.text
        }).then(function(response){
          console.log("abc",response);
        //  $scope.buttonLoader = false;
          if(response.status==201){
            alert("Enquiry Sent");
          }
        });
      }

    }



  });
