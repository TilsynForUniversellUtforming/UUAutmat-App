angular.module('appMain.controllers')

.controller('loginCtrl', function($scope, LoginService, $ionicPopup, $state)
{
    $scope.data = {};

    $scope.login = function()
    {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data)
        {
            $state.go('mainMenu');
        }).error(function(data)
        {
            var alertPopup = $ionicPopup.alert(
            {
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})