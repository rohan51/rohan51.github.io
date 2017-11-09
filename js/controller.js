(function () {
    "use strict";

    angular
    .module("app.controllers.DataController", [])
    .controller("DataController", [
        "$scope",
        "foursquare",
        DataController
        ]);

    function DataController($scope, foursquare) {
        
        /*
            $scope variable initialization
        */

        //default category is "All", which means we will show venues across all categories
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

        /*
            Local variable initialization
        */

        let map;
        let markersArray = [];
        const initialZoom = 1; //initial map is loaded with the view fully zoomed out
        const initialMapPosition = {lat: -25.363, lng: 131.044};
        const venueZoom = 12; //once data is retrieved, zoom in closer so markers are distinguishable

        /*
            Local functions
        */

        //clear map of previous overlays
        function clearOverlays() {
            markersArray.forEach((marker) => marker.setMap(null));
            markersArray = [];
        }

        function transformFoursquareData(data) {
            clearOverlays();
            $scope.promptUser = false;
            $scope.loading = false;
            $scope.showError = false;
            $scope.venuesData = data;
            data.forEach((venue) => {
                
                let marker = new google.maps.Marker({
                  position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
                  map: map,
                  label: venue.venue.name,
                });

                markersArray.push(marker);
                
                //use the first venue's data to set centering co-ordinates
                map.setCenter({lat: data[0].venue.location.lat, lng: data[0].venue.location.lng});
                map.setZoom(venueZoom);

            })
        }

        /*
            $scope functions
        */

        
        $scope.initMap = function() {
            map = new google.maps.Map(document.getElementById('map'), {
                zoom: initialZoom,
                center: initialMapPosition
            });
        }

        $scope.getVenues = function () {
            let apiParams = {
                radius: parseInt($scope.radius) * 1000, //convert to meters from km
                category: $scope.category.toLowerCase() === "all" ? "" : $scope.category, // "All" category corresponds to excluding the query parameter altogether
            }

            if ($scope.locationInput) {
                $scope.loading = true;
                apiParams.locationInput = $scope.locationInput;
                foursquare.getData(apiParams).then(function (data,test) {
                    transformFoursquareData(data);
                }, function (error) {
                    $scope.loading = false;
                    $scope.promptUser = false;
                    $scope.showError = true;
                });
            } else if (navigator.geolocation) {
                $scope.loading = true;
                navigator.geolocation.getCurrentPosition(function (userLocation) {
                    apiParams.latitude = userLocation.coords.latitude;
                    apiParams.longitude = userLocation.coords.longitude;

                    foursquare.getData(apiParams).then(function (data,test) {
                        transformFoursquareData(data);
                    }, function (error) {
                        $scope.loading = false;
                        $scope.promptUser = false;
                        $scope.showError = true;
                    });
                }, function (err) {
                    $scope.$apply(
                        () => {
                            $scope.loading = false;
                            $scope.promptUser = true;
                            $scope.showError = false;
                        }
                    )
                });
            }
        }

    }
})();