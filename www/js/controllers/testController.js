angular.module('appMain.controllers')

.controller('testController', function($scope, $stateParams, TestObjectService, IndicatorService, TestService, TestTemplateService, TestSectionService)
{
    if ($stateParams.temp !== null)
    {
        console.log("Test template present")
        TestService.setTemplate($stateParams.temp);
        init()
    }
    else
    {
        console.log("Test template NOT present, getting default for tests")
        TestTemplateService.getResource().get(
        {
            id: '5728051cee4c45c435627a8b'
        }, function(t)
        {
            console.log("got it")
            TestService.setTemplate(t);
            init()
        });
    }


    function init()
    {
        $scope.test = TestService.getTemplate();
        TestService.setupTest();

        $scope.indicators = TestService.getIndicators();
        $scope.testObjects = TestService.getTestObjects();

        $scope.sectionsInfo = TestSectionService.getSections();
        $scope.sectionIndex = TestSectionService.getIndex();
        $scope.inputTypes = TestSectionService.getInputTypes();
    }

    function setCurrentObjects()
    {
        if ($scope.getSection($scope.sectionIndex).type === 'indicator')
        {
            $scope.currentIndicator = $scope.indicators[$scope.getSection($scope.sectionIndex).index];
            console.log("current Indicator is " + $scope.currentIndicator)
        }
        if ($scope.getSection($scope.sectionIndex).type === 'test_object')
        {
            $scope.currentTestObject = $scope.testObjects[$scope.getSection($scope.sectionIndex).index];
            console.log("current test object is " + $scope.currentTestObject)
        }
    }
    $scope.nextSection = function()
    {
        // console.log("next ctrl: " + $scope.sectionIndex)
        TestSectionService.nextSection();
        $scope.sectionIndex = TestSectionService.getIndex();
        setCurrentObjects()

    }
    $scope.previousSection = function()
    {
        TestSectionService.previousSection();
        $scope.sectionIndex = TestSectionService.getIndex();
        setCurrentObjects()
    }

    $scope.getSection = function(ind)
    {
        return TestSectionService.getSection(ind);
    }
    $scope.setRadioAltAnswer = function(input, alt)
    {
        input.answer = alt.text;
    }
    $scope.getInputFieldTemplate = function(type)
    {
        for (i = 0; i < $scope.inputTypes.length; i++)
        {
            if ($scope.inputTypes[i].name === type)
            {
                // console.log("returning " + $scope.inputTypes[i].url)
                return $scope.inputTypes[i].url;
            }
        }
        // console.log("input template not found")
    }
})