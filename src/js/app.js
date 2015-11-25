var app = angular.module('seminorBlogGenerator', ['ngSanitize', 'ngRoute', 'ngLodash']);

app.config(function($locationProvider) {
  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });
});

Handlebars.registerHelper('urlencode', function(str){
  return encodeURIComponent(str);
});
