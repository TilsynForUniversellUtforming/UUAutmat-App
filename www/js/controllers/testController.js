angular.module('appMain.controllers')

.controller('testController', function($scope, $stateParams, TestObjectService, IndicatorService, TestService, TestTemplateService, TestSectionService)
{
    if ($stateParams.temp !== null)
    {
        console.log("Test template present")
        TestService.setTemplate($stateParams.temp);
    }
    else
    {
        console.log("Test template NOT present, getting default for tests")
        TestTemplateService.getResource().get(
        {
            id: '5726ad4ce0937e182ed61bea'
        }, function(t)
        {
            console.log("got it")
            TestService.setTemplate(t);
        });
    }

    $scope.test = TestService.getTemplate();
    TestService.setupTest();

    $scope.indicators = TestService.getIndicators();
    $scope.testObjects = TestService.getTestObjects();

    $scope.sectionsInfo = TestSectionService.getSections();
    $scope.sectionIndex = TestSectionService.getIndex();

    $scope.nextSection = function()
    {
        console.log("next ctrl: " + $scope.sectionIndex)
        TestSectionService.nextSection();
        $scope.sectionIndex = TestSectionService.getIndex();
    }
    $scope.previousSection = function()
    {
        TestSectionService.previousSection();
        $scope.sectionIndex = TestSectionService.getIndex();
    }

    $scope.getSection = function(ind)
    {
        return TestSectionService.getSection(ind);
    }
    $scope.setRadioAltAnswer = function(input, alt)
    {
        input.answer = alt.text;
    }
})