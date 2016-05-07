angular.module('appMain.controllers')
    .controller('overviewCtrl', function($scope, testResultService, testService, testTemplateService)
    {

        $scope.templates = TestTemplateService.getResource().query();



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