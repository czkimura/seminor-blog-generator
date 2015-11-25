(function() {
  'use strict';
  var app = angular.module('seminorBlogGenerator');
  app.controller('mainController', function($scope, $document, $http, lodash) {
    var self = this;
    self.contents = [{}];
    self.md = '';
    self.hbs = '';

    $scope.$watch(function() {return self.contents}, function() {
      if (self.contents.length > 0) {
        self.md = self.hbs({contents: self.contents});
      }
    }, true);

    self.init = function(url) {
      self.hbs = Handlebars.compile(angular.element('#sw-template').text());
      if (!lodash.isString(url) || url.length === 0) {
        return ;
      }
      $http({
        url: url
      }).then(function(response) {
        self.contents = response.data.contents;
      })
    }

    self.expandContent = function() {
      seld.contents.push({});
    }
  })
}());
