(function () {
    "use strict";

    angular
    .module("app.controllers.MyController", [])
    .controller("MyController", [
        "$scope",
        "foursquare",
        MyController
        ]);

    function MyController($scope, foursquare) {
        /*
        $scope variable initialization
        */

        $scope.category = "All";

        $scope.categories =
        [
            "All",
            "Food", 
            "Drinks",
            "Coffee",
            "Shops",
            "Arts",
            "Outdoors",
            "Sights",
            "Trending"
        ];     

        $scope.radius = "5";
        
        $scope.radii =
        [
            "5",
            "10",
            "15",
            "25",
            "50"
        ];       

        $scope.venuesData = [];



        $scope.getVenues = function () {
            if ($scope.locationInput) {
                let roh =  foursquare.getData().then(function (data) {
                        //promise is resolved
                        // debugger;
                    });
            } else if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (userLocation) {
                    let roh =  foursquare.getData(userLocation.coords.latitude, userLocation.coords.longitude).then(function (data) {
                        //promise is resolved
                        $scope.venuesData = data;
                        // debugger;
                    });
                });
            }
        }

        $scope.near = function () {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function (userLocation) {
                    let roh =  foursquare.getData(userLocation.coords.latitude, userLocation.coords.longitude).then(function (data) {
                        //promise is resolved
                        // debugger;
                    });
                });
            }
        }
    }
})();