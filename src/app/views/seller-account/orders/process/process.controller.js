angular.module('BG').controller('ProcessSellerOrderCtrl',
  /** @ngInject */
    function ($scope,$state, $stateParams, SellerOrdersService,InventoryService) {

    var mdl = $scope.mdl = {};
    var status=['not_confirmed',
      'confirmed',
      'approved',
      'ready_to_ship',
      'ready_to_pickup',
      'dispatched',
      'picked_up',
      'delivered',
      'end_contract'];
    //mdl.shippingKind=$stateParams.shippingKind;
    SellerOrdersService.getOrder($stateParams.id).then(function(response){
      mdl.orderLine = response.data.data;
      mdl.item=response.data.data.items[$stateParams.itemIndex];
      //mdl.selectedInventory=null;
      mdl.currentStatusIndex = status.indexOf(mdl.item.current_status);
      getOptionStatus(mdl.item.current_status);

      if(mdl.item.current_status=="confirmed"){
        InventoryService.getInventoryList(mdl.item.detail.id).then(function (response) {
          mdl.inventories = response.data.data;
        });
      }
      console.log(mdl.item);
    });




    /*
    not_confirmed: User placed the order but payment and other verification is pending
    confirmed: Item is confirmed by the system which means payment is collected
    approved: Item is approved/accepted by seller, which means seller will process shortly
    ready_to_ship: Item is ready to ship to buyer location if shipping_kind if delivery
    dispatched: Item is shipped
    ready_to_pickup: Item ready to pick up means buyer can pickup the item any time from the seller's location
    picked_up: Item is picked up
    delivered: Item is delivered
    cancelled: Item is canceled by either seller or buyer. Can be cancelled only when status is or before ready_to_pickup / ready_to_ship
    end_contract: When buyer want to end the rental Item contract.
    */

    function getOptionStatus(name){

      var rvalue=[];
      angular.forEach(options[name],function(o){
        rvalue.push({
          id:o,
          text:optionNames[o]
        })
      });

      mdl.statusOptions=rvalue;
    }
    var options={
     'not_confirmed':['confirmed'],
     'confirmed':['approved','cancelled'],
     'approved':['ready_to_ship','ready_to_pickup'],//this is bases shipping method
     'ready_to_ship':['dispatched'],
     'ready_to_pickup':['picked_up'],
     'dispatched':['delivered'],
     'picked_up':['end_contract'],
     'delivered':['end_contract'],
     'cancelled':[],
     'end_contract':[]
    };

    var optionNames = {
      'not_confirmed':'Not Confirmed',
      'confirmed':'Confirmed',
      'approved':'Approved',
      'ready_to_ship':'Ready to Ship',
      'ready_to_pickup':'Ready to Pickup',
      'dispatched':'Dispatched',
      'picked_up':'Picked Up',
      'delivered':'Delivered',
      'cancelled':'Cancelled',
      'end_contract':'End Contract'
    };

    mdl.update=function(){
      $scope.buttonLoader = true;
      if(mdl.changedStatus){
        SellerOrdersService.updateStatus(mdl.orderLine.id,mdl.item.id,mdl.changedStatus.id,mdl.comment,mdl.selectedInventory).then(function(){
          $scope.buttonLoader = false;
          $state.go("main.sellerAccount.orders.view",{id:$stateParams.id});
        });
      }
      else {
        $scope.buttonLoader = false;
      }

    };

    mdl.cancel=function() {
      $state.go("main.sellerAccount.orders.view",{id:$stateParams.id});
    }




  });
