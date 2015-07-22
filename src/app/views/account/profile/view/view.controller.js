angular.module('BG').controller('ViewProfileCtrl',
  /** @ngInject */
    function ($scope,ProfileService,$rootScope) {
    var mdl = $scope.mdl = {};
    mdl.user=angular.copy($rootScope.user);
//    ProfileService.getUser($rootScope.user.id).then(function(response){
//      mdl.user = response.data.data;
//    });
  }
);