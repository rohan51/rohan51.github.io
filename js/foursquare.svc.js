(function () {
    "use strict";

    angular.module("app.services.foursquare", [])
    .factory("foursquare",
        [
            "$http",
            "$q",
            foursquareService
        ]);

    function foursquareService($http, $q) {

            const clientId = "1RJVGUVJTWCHJFPFI5WESRMZPNNSE1F5WXWJ4I0JMQMA151R";
            const clientSecret = "2P1RUNPWPN04SHZPFTKLUF3WRZVUSZQBKGTMWR4DYUO3EF4C";
            const baseUrl = `https://api.foursquare.com/v2/venues/explore?v=20161016&limit=20&client_id=${clientId}&client_secret=${clientSecret}`;

            function getData(apiParams) {
                let queryParams = constructQueryString(apiParams);
                return $http({
                    method: "GET",
                    cache: true,
                    url: `${baseUrl}${queryParams}`,
                }).then(function successCallback(data) {
                    return processResponse(data);
                }, function errorCallback(error) {
                    console.log(error);
                    return $q.reject(error);
                });
            }

            function constructQueryString(apiParams) {
                let parameterString = "";
                if (apiParams.locationInput) {
                    parameterString += `&near=${apiParams.locationInput}`;
                } else {
                    parameterString += `&ll=${apiParams.latitude},${apiParams.longitude}`;
                }

                parameterString += `&radius=${apiParams.radius}`;

                if (apiParams.category) {
                    parameterString += `&section=${apiParams.category}`;
                }

                return parameterString;
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