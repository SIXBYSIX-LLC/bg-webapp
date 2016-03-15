
angular.module('BG').filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
}).filter("dateRangeFilter", function() {
  return function(items, from, to) {
   if(items)
   {
   var df = from ||0;
    var dt = to||moment();
    var result = [];
    for (var i=0; i<items.length; i++){
      var tf = moment(items[i].date_created_at);
      console.log(tf);
      if (tf > df && tf < dt)  {
        result.push(items[i]);
      }
    }
    return result;
  };};
});
