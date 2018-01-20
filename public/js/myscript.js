var MyWebApp = angular.module('MyWebApp', ['ngMessages']);

MyWebApp.config(function($locationProvider) {
    $locationProvider.html5Mode({
      enabled: true,
      requireBase: false
    });
});


//Controller for home page, Validation
MyWebApp.controller('MyWebAppController', ['$scope','$http','$window', function($scope,$http,$window) {
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
                        $window.location.href = '/enroll?emailid=' + encodeURIComponent($scope.emailInput);
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


          MyWebApp.controller('SubscribeController', ['$scope','$http','$window', '$location', function($scope,$http,$window,$location) {
            $scope.inputEmail = $location.search().emailid;

            if($scope.inputEmail == '')
            {
                $window.location.href = '/';
            }

          }]);

           MyWebApp.controller('RegisterController', ['$scope','$http','$window', '$location', function($scope,$http,$window,$location) {
           $scope.enter = function () {
              console.log($scope.myForm.$valid);
              if($scope.myForm.$valid) {
                
                if($scope.Ppassword != $scope.Pconfirmpassword)
                {
                    $scope.noMatch = true;
                }
                else
                {
                  console.log("1");
                  //post to /success page
                  var frm = angular.element('#myForm');
                  frm.submit();
                }
              }
            
            }

            $scope.exit = function () {
              $window.location.href = '/';
            }

          }]);