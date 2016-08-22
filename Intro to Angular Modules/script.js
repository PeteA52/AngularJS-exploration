// Code goes here
(function() {
  // 'angular' is the one variable added to the global namespace by Angular
  var app = angular.module("githubViewer", []);

  var MainController = function($scope, $http, 
      $log, $location, $anchorScroll,
      githubService) {
    //var onGetUserComplete = function(response) {
    //  $scope.user = response.data;
    //  $http.get($scope.user.repos_url)
    //    .then(onGetReposComplete, onGetReposError);
    //};
    
    var onGetUserByServiceComplete = function(user) {
      $scope.user = user;
      githubService.getRepos(user)
        .then(onGetReposByServiceComplete, onGetReposError);
    };

    var onGetUserError = function(reason) {
      $scope.error = "Could not fetch the user";
    };

    //var onGetReposComplete = function(response) {
    //  $scope.repos = response.data;
    //};
    
    var onGetReposByServiceComplete = function(repos) {
      $scope.repos = repos;
      // scroll to the userDetails
      $location.hash("userDetails");
      $anchorScroll();
    };

    var onGetReposError = function(reason) {
      $scope.error = "Could not fetch the repository list";
    };

    $scope.repoSortOrder = "-stargazers_count"; // leading "-" means descending

    $scope.username = "Angular";

    $scope.search = function(username) {
      //$log.info("Searching for " + username);
      // $http object methods are asynchronous; they return a "promise"
      //  with a then() method, to which a function which is executed when the
      //  call is complete can be passed
      //$http.get("https://api.github.com/users/" + username)
      //  .then(onGetUserComplete, onGetUserError);
      // same call as above, but using the user-defined service
      githubService.getUser(username)
        .then(onGetUserByServiceComplete, onGetUserError);
    };
    $scope.message = "GitHub Viewer";
  };

  // $scope and $http are passed in this method signature to allow for minification.
  // All angular services that are needed by the application need to be named here
  // (unless the simpler app.controller signature is used - in this case, the arguments
  //  of the MainController function are examined for services and no minification 
  //  is allowed.)
  //app.controller("MainControllerName", [
  //  "$scope", "$log", "$location", "$anchorScroll", 
  //  "github", MainController]); 
  app.controller("MainControllerName", MainController);
}());