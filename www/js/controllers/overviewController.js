angular.module('appMain.controllers')
    .controller('overviewCtrl', function($scope, TestResultService, TestService, TestTemplateService)
    {

        $scope.templates = TestTemplateService.getTemplates();
        console.log("Templates are: ")
        console.log($scope.templates)


        var activeTestType = {};
        $scope.tests = [];
        $scope.TestTypeClick = function(obj)
        {
            activeTestType = obj;
            console.log("id is " + obj._id)
            $scope.tests = '';
            var res = TestResultService.getResource().get(
            {
                template_id: obj._id
            }, function(r) {

            });

        }
        $scope.changeActiveTestType = function(obj)
        {
            if (obj == activeTestType) return true;
            return false;
        }





    });