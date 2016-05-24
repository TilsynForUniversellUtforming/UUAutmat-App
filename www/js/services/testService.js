angular.module('appMain.services')

.service('TestService', function(TestObjectService, IndicatorService, TestSectionService, ConnectionService, FileService)
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
            if (ConnectionService.getStatus())
            {
                console.log("Application online, getting indicators from server.")
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
                    FileService.write('ind_' + r._id, JSON.stringify(r))
                    t++;
                    TestSectionService.addIndicator(obj);

                    console.log("Service: Adding Indiocator")
                })
            }
            else
            {
                console.log("Application offline, getting indicators from local storage, if possible.")
                var filename = "ind_" + template.indicators[i];
                var text = FileService.read(filename).then(function(result)
                {
                    ind = JSON.parse(result);
                    indicators.push(ind);
                    var obj = {
                        name: ind.name,
                        type: 'indicator',
                        templateUrl: 'templates/partials/inputIndicator.html',
                        index: t
                    }
                    t++;
                    TestSectionService.addIndicator(obj);
                    deferred.resolve(obj);
                });
            }
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
            if (ConnectionService.getStatus())
            {
                console.log("Application online, getting test object from server...")
                TestObjectService.getResource().get(
                {
                    id: template.test_objects[i]
                }, function(d)
                {
                    console.log("Test object retrieved.")
                    testObjects.push(d);
                    var obj = {
                        name: d.name,
                        type: 'test_object',
                        templateUrl: 'templates/partials/inputTestObject.html',
                        index: t
                    }
                    FileService.write('to_' + d._id, JSON.stringify(d))
                    t++;
                    TestSectionService.addTestObject(obj);

                    console.log("Service: Adding Test Object")
                })

            }
            else
            {
                console.log("Application offline, getting test objects from local storage, if possible.")
                var filename = "to_" + template.test_objects[i];
                var text = FileService.read(filename).then(function(result)
                {
                    to = JSON.parse(result);
                    testObjects.push(to);
                    var obj = {
                        name: to.name,
                        type: 'indicator',
                        templateUrl: 'templates/partials/inputIndicator.html',
                        index: t
                    }
                    t++;
                    TestSectionService.addTestObject(obj);
                    deferred.resolve(obj);
                });
            }
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