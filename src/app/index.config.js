(function() {
  'use strict';

  angular
    .module('BG')
    .config(config);

  /** @ngInject */
  function config($logProvider,$translateProvider,$httpProvider,cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
    $translateProvider.useStaticFilesLoader({
      prefix: '/app/i18n/',
      suffix: '.json'
    });
    /** @ngInject */
    function interceptor($rootScope,API) {
      var counter=0;
      return {
        'request': function(config) {

          if(config.url.indexOf(API.baseURL)==0){
            counter++;
            $rootScope.rmodel.loader=true;
          }
          if($rootScope.user){
            config.headers.AUTHORIZATION='Token '+$rootScope.user.token;
          }else{
            //TODO:remove this is production mode
            config.headers.AUTHORIZATION='Token 09761fba3677fe0edbd211efb79c1af882b88e48';
          }

          return config;
        },

        'response': function(response) {

          if(response.config && response.config.url.indexOf(API.baseURL)==0){

            counter--;
            if(counter<=0){
              $rootScope.rmodel.loader=false;
            }

          }
          if(response.config.url.indexOf("braintree/actions/generate_token")>0){
            console.log("Response",response);
            return {data: response.data.data.client_token,
                    status: 200,
                    statusText: "OK"};
          }else{
            return response;
          }
        },
        'responseError': function(response) {
          if(response.config && response.config.url.indexOf(API.baseURL)==0){

            counter--;
            if(counter<=0){
              $rootScope.rmodel.loader=false;
            }

          }
          return response;
        }
      };
    }
    $httpProvider.interceptors.push(interceptor);
  }

})();
