angular.module('appMain.controllers', [])

.controller('loginCtrl', function ($scope, LoginService, $ionicPopup, $state){
    $scope.data = {};

     $scope.login = function() {
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
            $state.go('mainMenu');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})
.controller('mainMenuCtrl', function($scope){

})
.controller('overviewCtrl', function ($scope, dummyData){

    $scope.testTyper = dummyData.getTyper();
    console.log($scope.testTyper[0]);


    var activeTestType={};
    $scope.testObjects = [];
    $scope.TestTypeClick = function(obj)
    {
        activeTestType = obj;
        $scope.testObjects = dummyData.getTestObjekter(obj.ID);

    }
    $scope.changeActiveTestType = function(obj)
    {
        if(obj==activeTestType) return true;
        return false;
    }
    




});