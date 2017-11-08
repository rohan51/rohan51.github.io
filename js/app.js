var fourSquareApp = angular.module("fourSquareApp", [
	//import dependent modules
		"app.controllers.MyController",
		"app.services.foursquare",
		"app.directives.venues"
	]);

fourSquareApp.config(["$locationProvider", "$compileProvider",
	function ($locationProvider, $compileProvider) {
		$locationProvider.html5Mode({enabled: true, requireBase: true, rewriteLinks: true});
	}]);