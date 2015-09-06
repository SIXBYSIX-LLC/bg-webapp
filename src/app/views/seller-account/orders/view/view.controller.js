angular.module('BG').controller('ViewSellerOrderCtrl',
  /** @ngInject */
    function ($scope, SellerOrdersService, $stateParams) {


    var mdl = $scope.mdl = {};
    SellerOrdersService.getOrder($stateParams.id).then(function(response){
      mdl.order=response.data.data;
    });

    mdl.getShippingPeriod = function(item){

      var fin=item.cost_breakup.subtotal.rent_period.final;
      var data=[];
      if(fin.months){
        data.push(fin.months + " month ")
      }
      if(fin.weeks){
        data.push(fin.weeks + " weeks ")
      }
      if(fin.days){
        data.push(fin.days + " days ")
      }
      if(fin.hours){
        data.push(fin.hours + " hours ")
      }
      return data.join(" ");
    }

  });