// ng-app declaration
var app = angular.module("translator", []);

// ng-controller declaration
app.controller("TransCtrl", ['$scope', '$http', function($scope, $http) {
    // Translation results variable
    $scope.translation = null;
    $scope.status = "primary";

    // Available languages list
    $scope.lang = [
        { disp: "English", val: "eng" },
        { disp: "Hindi", val: "hin" },
        { disp: "Italian", val: "ita" },
        { disp: "Russian", val: "rus" },
        { disp: "German", val: "deu" },
        { disp: "Arabic", val: "aao" },
        { disp: "French", val: "fra" },
        { disp: "Afrikaans", val: "afr" },
        { disp: "Hebrew", val: "heb" },
        { disp: "Manual Select", val: "manual" }
    ];

    // Translation method
    $scope.translate = function() {
        $scope.status = "primary";

        // Retrieve from/to languages
        var from = ($scope.langSrc.val !== "manual") ? $scope.langSrc.val : $scope.manualSrc;
        var to = ($scope.langDest.val !== "manual") ? $scope.langDest.val : $scope.manualDest;

        // Check valid input
        if (!from || !to || !($scope.text)) return;

        // Clear previous results
        $scope.translation = null;

        // Build URL for GET request
        var url = "https://glosbe.com/gapi/translate?from=" + from + "&dest=" + to + "&format=json&phrase=" + $scope.text + "&pretty=true";

        // Make GET request using $http service
        $http.get(url)
            .then(function(response) {
                // Success
                $scope.translation = response.data;
                $scope.status = "success";
            })
            .catch(function(error) {
                // Error
                $scope.translation = error;
                $scope.status = "danger";
            });
    };
}]);

// Custom filter to remove HTML tags
app.filter('removeHTMLTags', function() {
    return function(text) {
        return text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
});