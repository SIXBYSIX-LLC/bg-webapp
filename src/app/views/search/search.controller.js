angular.module('BG').controller('SearchCtrl',
  /** @ngInject */
    function ($scope, SearchService, $stateParams, $timeout,$rootScope) {

    var waitingForUpdate=false;
    var waitingForResponse=false;

    var searchMdl = $scope.searchMdl = {};
    var mainMdl = $scope.mainMdl;

    mainMdl.title="Search Results";

    $scope.addBreadcrumb({title: "Search"});
    $scope.$on("$destroy", function () {
      $scope.popBreadcrumb();
    });

    searchMdl.display = "list";

    var search=null;
    searchMdl.products=[];
    searchMdl.nextAvailable=true;
    searchMdl.sortBy='name';
    searchMdl.priceMin=0;
    searchMdl.priceMax=10000;
    searchMdl.working=false;

    searchMdl.locationFacets=[];
    searchMdl.locationFacets.allSelected = true;
    searchMdl.locationFacets.selectedId = null;

    searchMdl.features=[];
    for(var i=0;i<10;i++){
      searchMdl.features.push({
        name:"Feature "+(i+1),
        count:i*10
      })
    }


    searchMdl.search=function(){
      //if(searchMdl.searchText){
        searchMdl.products=[];
        searchMdl.nextAvailable=true;
        var conf={
          search:mainMdl.searchText || "",
          order_by:[searchMdl.sortBy],
          daily_price__gte:searchMdl.priceMin,
          daily_price__lte:searchMdl.priceMax
        };
        if(searchMdl.locationFacets.allSelected == false && searchMdl.locationFacets.selectedId){
          conf.location = searchMdl.locationFacets.selectedId;
        }
      if($stateParams.category){
        conf.category=$stateParams.category;
      }
        search=SearchService.search(conf);
        searchMdl.working=true;
        $rootScope.$broadcast("PI:SearchProcess",true);
        search.next().then(function (response) {
          var currentLocationId=searchMdl.locationFacets.selectedId;
          $rootScope.$broadcast("PI:SearchProcess",false);
          searchMdl.working=false;
          searchMdl.products=response.data.data;
          searchMdl.resultCount=response.data.meta.count;
          searchMdl.nextAvailable=search.isAvail();
          searchMdl.locationFacets=response.data.meta.facets;
          searchMdl.locationFacets.allSelected=true;

          if(currentLocationId){

            var lfs=searchMdl.locationFacets;
            angular.forEach(lfs,function(l){
              l.selected=false;
              if(currentLocationId == l.location.id){
                l.selected = true;
                searchMdl.locationFacets.allSelected=false;
                searchMdl.locationFacets.selectedId = currentLocationId;
              }
            });

          }

        });
      //}
    };

    $scope.locationFilterChanged=function(lf){
      var lfs=searchMdl.locationFacets;
      if(lf=='all'){
        angular.forEach(lfs,function(l){
          l.selected=false;
        });
        lfs.allSelected=true;
      }else{
        if(!lf.selected){
          var oneSelected=false;
          angular.forEach(lfs,function(l){
            if(l.selected){
              oneSelected=true;
            }
          });
          if(!oneSelected){
            lfs.allSelected=true;
            searchMdl.locationFacets.selectedId = null;
          }
        }else{
          lfs.allSelected=false;
        }
        searchMdl.locationFacets.selectedId= lf.location.id;
        console.log("XX",lf);
      }
      searchMdl.search();
    };
    searchMdl.sort=function(sortBy){
      searchMdl.sortBy=sortBy;
      searchMdl.search();
    };

    if($stateParams.query){
      mainMdl.searchText=$stateParams.query;
      searchMdl.search();
    }else{
      searchMdl.search();
    }

    searchMdl.next=function(){
      if(search.isAvail()){
        searchMdl.working=true;
        search.next().then(function (response) {
          searchMdl.working=false;
          console.log("Products",searchMdl.products.length,response.data.data);
          Array.prototype.push.apply(searchMdl.products,response.data.data);
          console.log("Products",searchMdl.products);
          searchMdl.nextAvailable=search.isAvail();
        });
      }

    };

    $scope.$on("$viewContentLoaded", function () {
      var lastTimeout=null;
      tjq("#price-range").slider({
        range: true,
        min: 0,
        max: 10000,
        values: [ 0, 10000 ],
        slide: function (event, ui) {

          searchMdl.priceMin=ui.values[0];
          searchMdl.priceMax=ui.values[1];
          if(waitingForUpdate==false){
            waitingForUpdate=true;
            if(lastTimeout){
              $timeout.cancel(lastTimeout);
            }
            lastTimeout=$timeout(function(){
              lastTimeout=null;
              searchMdl.search();
              waitingForUpdate=false;
            },2000);
          }

          tjq(".min-price-label").html("$" + ui.values[ 0 ]);
          tjq(".max-price-label").html("$" + ui.values[ 1 ]);
        }
      });
      tjq(".min-price-label").html("$" + tjq("#price-range").slider("values", 0));
      tjq(".max-price-label").html("$" + tjq("#price-range").slider("values", 1));

      tjq("#rating").slider({
        range: "min",
        value: 40,
        min: 0,
        max: 50,
        slide: function (event, ui) {

        }
      });
    });

  }
);
