angular.module('BG').filter('slice', function() {
  return function(arr, start, end) {
    return (arr || []).slice(start, end);
  };
}).filter('daterange', function ()
{
  return function(conversations, start_date, end_date)
  {
    //console.log(conversations,start_date,end_date);
    var result = [];

    // date filters
    start_date = (start_date && !isNaN(Date.parse(start_date))) ? Date.parse(start_date) :  0;
     end_date = (end_date && !isNaN(Date.parse(end_date))) ? Date.parse(end_date) : new Date().getTime();
    console.log(conversations,start_date,end_date);
    // if the conversations are loaded
    if (conversations && conversations.length > 0)
    {
      angular.forEach(conversations, function (conversation,index)
      {
        console.log(conversation.date_created_at);
        var conversationDate = new Date(conversation.date_created_at);
        console.log(conversationDate);
        if (conversationDate >= start_date && conversationDate <= end_date)
        {
          result.push(conversation);
        }
      });
        console.log(result);
      return result;
    }
  };
});
