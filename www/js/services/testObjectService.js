angular.module('appMain.services')
    .service('TestObjectService', function($resource)
    {
        var testObject = null;

        function getTestObject()
        {
            return testObject;
        }

        function setTestObject(obj)
        {
            testObject = obj;
        }

        function getResource()
        {
            return $resource('http://localhost:3000/api/nyobj/:id');
        }
        return {
            getResource: getResource,
            getTestObject: getTestObject,
            setTestObject: setTestObject
        }
    })