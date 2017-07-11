var MyWebApp = angular.module('MyWebApp', ['ngMessages']);

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