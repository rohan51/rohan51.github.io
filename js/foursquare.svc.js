(function () {
    "use strict";

    angular.module("app.services.foursquare", [])
    .factory("foursquare",
        [
        "$http",
        foursquareService
        ]);

    function foursquareService($http) {

        const clientId = "1RJVGUVJTWCHJFPFI5WESRMZPNNSE1F5WXWJ4I0JMQMA151R";
        const clientSecret = "2P1RUNPWPN04SHZPFTKLUF3WRZVUSZQBKGTMWR4DYUO3EF4C";

        //need to add section and radius
        function getData(latitude, longitude) {
            if (latitude && longitude) {
                return $http({
                    method: "GET",
                    cache: true,
                        url: `https://api.foursquare.com/v2/venues/explore?v=20161016&ll=${latitude},${longitude}&client_id=${clientId}&client_secret=${clientSecret}`,
                    }).then(function successCallback(data) {
                        return processResponse(data);
                    }, function errorCallback(error) {
                        console.log(error);
                    });
                } else {
                    return $http({
                        method: "GET",
                        cache: true,
                        url: `https://api.foursquare.com/v2/venues/explore?v=20161016&near=Chicago,IL&client_id=${clientId}&client_secret=${clientSecret}`,
                    }).then(function successCallback(data) {
                        return processResponse(data);
                    }, function errorCallback(error) {
                        console.log(error);
                    });
                }
            }

            function processResponse(data) {
                if (data.data && data.data.response && data.data.response.groups && data.data.response.groups.length > 0) {
                    return data.data.response.groups[0].items;
                } else {
                    return [];
                }
            }

            return {
                getData: getData,
            };
        };
    })();