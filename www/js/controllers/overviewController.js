angular.module('appMain.controllers')
    .controller('overviewCtrl', function($scope, dummyData)
    {

        $scope.testTyper = dummyData.getTyper();
        console.log($scope.testTyper[0]);


        var activeTestType = {};
        $scope.testObjects = [];
        $scope.TestTypeClick = function(obj)
        {
            activeTestType = obj;
            $scope.testObjects = dummyData.getTestObjekter(obj.ID);

        }
        $scope.changeActiveTestType = function(obj)
        {
            if (obj == activeTestType) return true;
            return false;
        }





    });