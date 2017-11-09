(function () {
    "use strict";

    angular
        .module("app.directives.venues", [])
        .directive("venues", ["$http", venuesDirective]);

    function venuesDirective($http) {
        return {
            restrict: "E",
            template: `
            <ul class="venues-list">
                <li ng-repeat="venue in venuesData" class="venue-item">
                    <a href={{venue.venue.url}}>{{venue.venue.name}}</a>
                    <div>Venue type: {{venue.venue.categories[0].name}}</div>
                </li>
            </ul>
            `,
            replace: true,
            scope: {
                venuesData: "="
            },
            link: function (scope) {
            }
        }
    }
})();