angular.module('BG').controller('InquiryListCtrl',
  /** @ngInject */
    function ($scope,InquiriesService) {

    var mdl = $scope.mdl = {};
//    InquiriesService.getInquiries().then(function(response){
//      mdl.items =  response.data.data;
//    });
    mdl.items=[
      {
        "id": 2,
        "thread": 2,
        "unread_count": 0,
        "message_count": 0,
        "date_created_at": "2015-08-31T12:15:09.314889Z",
        "date_updated_at": "2015-08-31T12:15:09.314908Z",
        "subject": "Inquiry about Earlene",
        "product": 81,
        "to_user": 8,
        "user": 3
      }
    ];




  });