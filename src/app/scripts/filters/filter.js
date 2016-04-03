
angular.module('BG').filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
}).filter("dateRangeFilter", function() {
  return function(items, from, to) {

    var df = from ;
    var dt = to;
   if(items)
   {

    var result = [];

    for (var i=0; i<items.length; i++){
      var tf = moment(items[i].date_created_at);
      
      if ( tf>df && tf<dt )  {
        result.push(items[i]);
      }
    }
    return result;
  };};
});
