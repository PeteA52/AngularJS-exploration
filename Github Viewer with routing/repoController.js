(function() {
  // get a reference
  var app = angular.module("githubViewer");

  var repoController = function($scope, $routeParams, githubService) {

    var username = $routeParams.username;
    var reponame = $routeParams.reponame;
  
    var onRepoComplete = function($data) {
      $scope.repo = $data;
    };
    
    var onRepoError = function(reason) {
      $scope.error = reason;
    };
    
    githubService.getRepoDetails(username, reponame)
        .then(onRepoComplete, onRepoError);
  };

  app.controller("RepoControllerName", repoController);
}());