angular.module('appMain.services')

.service('TestService', function(TestObjectService, IndicatorService, TestSectionService)
{
    var currentTemplate = null;
    var testObjects = [];
    var indicators = [];



    function setTemplate(template)
    {
        if (template != null)
        {
            currentTemplate = template;
        }
    }

    function getTemplate()
    {
        return currentTemplate;
    }

    function setIndicators(template)
    {
        if (template == null)
        {
            template = currentTemplate
        }
        var t = 0;
        for (i = 0; i < template.indicators.length; i++)
        {
            IndicatorService.getResource().get(
            {
                id: template.indicators[i]
            }, function(r)
            {
                indicators.push(r);
                var obj = {
                    name: r.name,
                    type: 'indicator',
                    templateUrl: 'templates/partials/inputIndicator.html',
                    index: t
                }
                t++;
                TestSectionService.addIndicator(obj);

                console.log("Service: Adding Indiocator")
            })
        }

    }

    function getIndicators()
    {
        return indicators;
    }

    function setTestObjects(template)
    {
        if (template == null)
        {
            template = currentTemplate
        }
        var t = 0;
        for (i = 0; i < template.test_objects.length; i++)
        {
            TestObjectService.getResource().get(
            {
                id: template.test_objects[i]
            }, function(d)
            {
                testObjects.push(d);
                var obj = {
                    name: d.name,
                    type: 'test_object',
                    templateUrl: 'templates/partials/inputTestObject.html',
                    index: t
                }
                t++;
                TestSectionService.addTestObject(obj);

                console.log("Service: Adding Test Object")
            })
        }

    }

    function getTestObjects()
    {
        return testObjects;
    }

    function setupTest()
    {
        console.log("trying to setup the test")
        setTestObjects();
        setIndicators();
    }


    return {
        setupTest: setupTest,
        getIndicators: getIndicators,
        getTestObjects: getTestObjects,
        getTemplate: getTemplate,
        setTemplate: setTemplate,
    }
})