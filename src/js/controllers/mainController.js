(function() {
  'use strict';
  var app = angular.module('seminorBlogGenerator');
  app.controller('mainController', function($scope, $document, $http, lodash) {
    var self = this;
    self.contents = [];
    self.md = '';
    self.hbs = '';

    $scope.$watch(function() {return self.contents}, function() {
      if (self.contents.length > 0) {
        self.md = self.hbs({contents: self.contents});
      }
    }, true);

    self.init = function() {
      self.hbs = Handlebars.compile(angular.element('#sw-template').text());
      $http({
        url: '/json/mock.json'
      }).then(function(response) {
        self.contents = response.data.contents;
      })
    }

    self.expandContent = function() {
      self.contents.push({});
    }
  })
}());
