angular.module('appMain.controllers')


.controller('testTemplateListController', function($scope, $state, TestTemplateService, TestObjectService)
{
    $scope.templates = [];
    $scope.templates = TestTemplateService.getTemplates().then(function(result)
    {
        $scope.templates = result;
        console.log("OUR TEMPLATES ARE: " + JSON.stringify($scope.templates))
    });
    console.log($scope.templates)
    $scope.infoMsg = {
        messages: [
        {
            text: "Velg en test mal for å starte."
        },
        {
            text: "Dra listen nedover for å oppdatere innhold."
        }],
        hide: false
    }
    $scope.startTest = function(temp)
    {
        console.log("STARTING TEST")
        $state.go('startNew',
        {
            temp: temp
        });
    }

})