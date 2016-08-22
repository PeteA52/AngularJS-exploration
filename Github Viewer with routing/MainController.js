// Code goes here
(function() {
  // get a reference
  var app = angular.module("githubViewer");

  var mainController = function($scope, $location) {

    $scope.search = function(username) {
      $location.path("/user/" + username);
    };

    $scope.username = "Angular";
  };

  app.controller("MainControllerName", mainController);
}());