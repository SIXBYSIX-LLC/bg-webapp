angular.module('BG').constant("API", {
  baseURL: "http://api.dev.buildergiant.com/v1/"
}).constant(
  "clientTokenPath","http://api.dev.buildergiant.com/v1/paymentgateway/braintree/actions/generate_token"
);
