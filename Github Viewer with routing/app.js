(function() {
  // 'angular' is the one variable added to the global namespace by Angular
  var app = angular.module("githubViewer", ["ngRoute"]);
  app.config(function($routeProvider) {
    $routeProvider
      // main (and default) route
      .when("/main", {
        templateUrl: "main.html",
        controller: "MainControllerName"
      })
      // user route with variable username
      .when("/user/:username", {
        templateUrl: "user.html",
        controller: "UserControllerName"
      })
      .when("/repo/:username/:reponame", {
        templateUrl: "repo.html",
        controller: "RepoControllerName"
      })
      // default redirects to main
      .otherwise({redirectTo: "/main"});
  });
}());