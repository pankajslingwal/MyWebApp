var MyWebApp = angular.module('MyWebApp', ['ngMessages']);

MyWebApp.config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});


//Controller for home page, Validation
MyWebApp.controller('MyWebAppController', ['$scope','$http','$window','myFactory', function($scope,$http,$window,myFactory) {
            $scope.user = {};
            $scope.results = [];

            $scope.email = {
              text: 'test@test.com'
            };

            $scope.ifEmailExist = false;

            var req = {
            method: 'GET',
            url: 'http://localhost:3000/validate',
            headers: {
              'Content-Type': 'application/json'
              } 
            }           

            $scope.search = function () {
              req.headers.email = $scope.emailInput;
              $http(req).then(function mySuccess(response) {
                    if(response != null && response.data != null && response.data.code != '200')
                    {
                        //console.log('Inside');
                        //myFactory.setEmail($scope.emailInput);
                        console.log($scope.emailInput);
                        
                        $window.location.href = '/subscribe?emailid=' + encodeURIComponent($scope.emailInput);
                    }
                    else
                    {
                      $scope.ifEmailExist = true;
                    }
                }, function myError(response) {
                  $window.location.href = '/error';
              });
            }

          }]);


          MyWebApp.controller('SubscribeController', ['$scope','$http','$window', '$location','myFactory', function($scope,$http,$window,$location,myFactory) {
            //console.log('Inside 2');
            //console.log('Inside 2 getEmail' + myFactory.getEmail());
            //$scope.subscribedEmail = myFactory.getEmail();
            console.log($location.search());
            
            $scope.inputEmail = $location.search().emailid;

            if($scope.inputEmail == '')
            {
                $window.location.href = '/';
            }

          }]);


//Controller for Subscribe page, Validation
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