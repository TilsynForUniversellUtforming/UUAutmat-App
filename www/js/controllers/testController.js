angular.module('appMain.controllers')

.controller('testController', function($scope, $stateParams, TestObjectService, IndicatorService, TestService, TestTemplateService, TestSectionService, TestResultService)
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
            id: '57308ad12bb619b763e230f3'
        }, function(t)
        {
            console.log("got it")
            TestService.setTemplate(t);
            init()
        });
    }

    $scope.setGeolocation = function()
    {
        $scope.test.geolocation = !$scope.test.geolocation
        if ($scope.test.geolocation)
        {

            navigator.geolocation.getCurrentPosition(function(position)
            {
                console.log('Latitude: ' + position.coords.latitude + '\n' +
                    'Longitude: ' + position.coords.longitude + '\n' +
                    'Altitude: ' + position.coords.altitude + '\n' +
                    'Accuracy: ' + position.coords.accuracy + '\n' +
                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                    'Heading: ' + position.coords.heading + '\n' +
                    'Speed: ' + position.coords.speed + '\n' +
                    'Timestamp: ' + position.timestamp + '\n');

                $scope.$apply(function()
                {
                    $scope.test.geolocationData = position;
                });
            }, function onError(error)
            {
                console.log('code: ' + error.code + '\n' +
                    'message: ' + error.message + '\n');
                $scope.test.geolocationData = {
                    msg: "unable to gather geolocation data"
                };
            });
        }
        else
        {
            $scope.test.geolocationData = null;
            $scope.test.geolocation = false;
        }
    }

    function init()
    {
        $scope.company = {};
        $scope.test = TestService.getTemplate();
        $scope.test.geolocationData = {};
        TestService.setupTest();

        $scope.indicators = TestService.getIndicators();
        $scope.testObjects = TestService.getTestObjects();

        $scope.sectionsInfo = TestSectionService.getSections();
        $scope.sectionIndex = TestSectionService.getIndex();
        $scope.inputTypes = TestSectionService.getInputTypes();
    }
    $scope.jsonshow = function(obj)
    {
        console.log(JSON.stringify(obj))
    }
    $scope.showTestRes = function()
    {
        TestResultService.prepareResults($scope.test, $scope.indicators, $scope.testObjects, $scope.company);
        $scope.jsonshow(TestResultService.getResults())
    }
    $scope.finishTest = function()
    {
        console.log(" " + $scope.indicators.length + " " +
            $scope.testObjects.length)
        TestResultService.prepareResults($scope.test, $scope.indicators, $scope.testObjects, $scope.company);
        var res = TestResultService.saveResults();

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