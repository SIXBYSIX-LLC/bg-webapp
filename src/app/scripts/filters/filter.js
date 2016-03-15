
angular.module('BG').filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
}).filter("dateRangeFilter", function() {
  return function(items, from, to) {
    console.log(from,to)
    var df = from ;
    var dt = to;
   if(items)
   {

    var result = [];
    // console.log(df)
    for (var i=0; i<items.length; i++){
      var tf = moment(items[i].date_created_at);
      //console.log(tf);;console.log(dt);
      if ( tf>df && tf<dt )  {
        result.push(items[i]);
      }
    }
    return result;
  };};
});
