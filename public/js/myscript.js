var MyWebApp = angular.module('MyWebApp', ['ngMessages']);

// MyWebApp.config(['$locationProvider', function($locationProvider) {
//         $locationProvider.html5Mode(true);
//     }]);

MyWebApp.factory('myFactory', function(){
    var savedData = {}
    var emailAddress;

    savedData.setEmail = function (emailadd)
    {
        emailAddress =emailadd;
    };

    savedData.getEmail = function ()
    {
        return emailAddress
    };

    return savedData;
});