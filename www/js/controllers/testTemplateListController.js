angular.module('appMain.controllers')


.controller('testTemplateListController', function($scope, $state, TestTemplateService, TestObjectService)
{
    $scope.templates = [];
    $scope.templates = TestTemplateService.getResource().query();
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
        $state.go('startNew',
        {
            temp: temp
        });
    }

})