(function() {
  // define the variable that holds the function that implements the service
  var github = function($http) {

    // internal implementation of the api
    var getUser = function(username) {
      return $http.get("https://api.github.com/users/" + username)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepos = function(user) {
      return $http.get(user.repos_url)
        .then(function(response) {
          return response.data;
        });
    };

    var getRepoDetails = function(username, reponame) {
      var repo;
      var repoUrl = "https://api.github.com/repos/" + username + "/" + reponame;
      return $http.get(repoUrl)
                  .then(function(repoResponse){
                    repo = repoResponse.data;
                    return $http.get(repoUrl + "/contributors");
                  })
                  .then(function(contributorsResponse){
                    repo.contributors = contributorsResponse.data;
                    return repo;
                  })
    };

    // Revealing Module design pattern - this is the public api.
    return {
      getUser: getUser,
      getRepos: getRepos,
      getRepoDetails: getRepoDetails
    };
  };

  // Register a service - there are lots of ways to do this!
  // 1. get a reference to the app module (script.js)
  var module = angular.module("githubViewer");
  // 2. register and configure the service
  module.factory("githubService", github);
}());