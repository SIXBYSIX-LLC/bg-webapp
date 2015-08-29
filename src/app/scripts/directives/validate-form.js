angular.module('BG').directive("validateForm",
  /** @ngInject */
  function($translate){
  return {
    scope:false,
    restrict:"A",
    link:function(scope,elem,attrs){
      var elms=elem.find("input,select,textarea");
      var validate=false;
      var nameMapped={};
      var valuestoWatch=[];
      var names=[];
      var allErrors={};
      angular.forEach(elms,function(elm){
        elm=angular.element(elm);
        var name=elm.attr("name");
        if(name){
          nameMapped[name]=elm;
          names.push(name);
          allErrors[name] =  {};
          valuestoWatch.push(attrs.name+"."+name+".$error");
        }
      });


//      scope.$on("validation",function(ev,value) {
//        validate = !!value;
//        checkAll(scope.$eval(attrs.name));
//      });

      var watchStr="["+valuestoWatch.toString()+"]";
      scope.$on(attrs.validateForm || "validation",function(ev,value){
        validate = !!value;
        if(validate){
          checkAll(scope.$eval(watchStr));
        }
      });



      scope.$watch(watchStr,checkAll,true);

      function checkAll(form){

        var name;
        for(var i=0;i<names.length;i++){
          name=names[i];
          update(form[i],allErrors[name],nameMapped[name],name)
        }
      }
      var defaults={
        required:"This field is required"
      };
      function update(obj,currentErrors,el,name){
        var key;
        if(validate){
          var hasError=false;

          if(typeof obj=="object"){
            for(key in obj){if(obj.hasOwnProperty(key)){
              if(obj[key] && !currentErrors[key]) {
                hasError = true;
                var transKey=name + "_" + key;
                console.log("K",transKey);
                var message=$translate.instant(transKey);
                if(message==transKey && defaults.hasOwnProperty(key)){
                  message=defaults[key];
                }
                var content = "<div class='" + name + " error'>" + message + "</div>";
                el.after(content);
                currentErrors[key]=true;
              }

            }}

            for(key in currentErrors){if(currentErrors.hasOwnProperty(key)){
              if(!(obj[key])){
                currentErrors[key]=false;
                angular.element(el.parent().parent()[0].querySelector("div."+name+".error")).remove();
              }
            }}

            hasError ? el.addClass("has-error") : el.removeClass("has-error");


          }
        }
      }
    }
  }
});