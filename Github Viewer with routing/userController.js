// Code goes here
(function() {
  // get a reference
  var app = angular.module("githubViewer");

  var userController = function($scope, $routeParams, githubService) {

    var onGetUserByServiceComplete = function(user) {
      $scope.user = user;
      githubService.getRepos(user)
        .then(onGetReposByServiceComplete, onGetReposError);
    };

    var onGetUserError = function(reason) {
      $scope.error = "Could not fetch the user";
    };

    var onGetReposByServiceComplete = function(repos) {
      $scope.repos = repos;
    };

    var onGetReposError = function(reason) {
      $scope.error = "Could not fetch the repository list";
    };

    $scope.repos = function(username, reponame) {
      $location.path("/repo/" + username + "/" + reponame);
    };

    $scope.username = $routeParams.username;
    $scope.repoSortOrder = "-stargazers_count"; // leading "-" means descending
    githubService.getUser($scope.username)
        .then(onGetUserByServiceComplete, onGetUserError);
  };

  app.controller("UserControllerName", userController);
}());