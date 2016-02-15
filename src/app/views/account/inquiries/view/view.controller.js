angular.module('BG').controller('InquiryViewCtrl',
  /** @ngInject */
    function ($scope,$stateParams,InquiriesService,SystemService) {

    var mdl = $scope.mdl = {};
    mdl.user = $scope.user;

    InquiriesService.getInquiry($stateParams.id).then(function(response){
      if(response){
        mdl.inq = response;
//        SystemService.getUser(response.to_user).then(function(response){
//          mdl.toUser= response.data.data;
//        })
      }
    });

    function getMessages(){
      InquiriesService.getMessages($stateParams.id).then(function(response){
        mdl.items = response.data.data;
      });
    }
    getMessages();


    mdl.sendMessage=function(){
      if(mdl.message){
        InquiriesService.sendMessage($stateParams.id,{
          text:mdl.message
        }).then(function(){
          getMessages();
          mdl.message="";
        })
      }
    }


  });