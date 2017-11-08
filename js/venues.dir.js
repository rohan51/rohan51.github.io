(function () {
    "use strict";

    angular
        .module("app.directives.venues", [
        ])
        .directive("venues", ["$http", venuesDirective]);

    function venuesDirective($http) {
        return {
            restrict: "E",
            template: `
            <ul>
                <li ng-repeat="venue in venuesData">
                    <a href={{venue.venue.url}}>{{venue.venue.name}}</a>
                    |
                    <span>Type: {{venue.venue.categories[0].name}}</span>
                </li>
            </ul>
            `,
            replace: true,
            scope: {
                venuesData: "="
            },
            link: function (scope) {
                scope.$watch("venuesData", function (old, newv) {
                    let t = scope.venuesData;
                });
            }
        }
    }
})();