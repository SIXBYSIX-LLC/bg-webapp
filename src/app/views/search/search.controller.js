angular.module('BG').controller('SearchCtrl',
  /** @ngInject */
    function ($scope, SearchService, $stateParams) {
    var searchMdl = $scope.searchMdl = {};
    searchMdl.display = "list";
    var search;



    window.r=$scope;
    window.p=searchMdl;
    searchMdl.products=[];
    searchMdl.nextAvailable=true;


    searchMdl.search=function(){
      if(searchMdl.searchText){
        search=SearchService.search(searchMdl.searchText);
        search.next().then(function (response) {
          searchMdl.products=response.data.data;
          searchMdl.nextAvailable=search.isAvail();
        });
      }
    };

    if($stateParams.query){
      searchMdl.searchText=$stateParams.query;
      searchMdl.search();
    }

    searchMdl.next=function(){
      if(search.isAvail()){
        search.next().then(function (response) {
          console.log("Products",searchMdl.products.length,response.data.data);
          Array.prototype.push.apply(searchMdl.products,response.data.data);
          console.log("Products",searchMdl.products);
          searchMdl.nextAvailable=search.isAvail();
        });
      }

    };

    $scope.$on("$viewContentLoaded", function () {
      console.log("View Content Loaded");
      tjq("#price-range").slider({
        range: true,
        min: 0,
        max: 1000,
        values: [ 100, 800 ],
        slide: function (event, ui) {
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