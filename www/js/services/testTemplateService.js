angular.module('appMain.services')

.service('TestTemplateService', function($resource, ConnectionService, FileService, $rootScope, $q)
{
    var template = null;
    var templates = [];

    function getTemplate()
    {
        return template;
    }

    function setTemplate(temp)
    {
        template = temp;
    }

    function getResource()
    {
        console.log("getting resource for templates")
        return $resource('http://torden.rogerww.com/api/testTemplates/:id');
    }

    function getTemplates()
    {
        //create a promise
        var deferred = $q.defer();
        //check if we are online
        if (ConnectionService.getStatus())
        {
            console.log("Application is online, getting templates from remote server.")
            templates = getResource().query().$promise.then(function(result)
            {
                //Write to local file to keep data up to date in case we need to work offline
                FileService.write('templates', JSON.stringify(result))
                templates = result
                console.log("templates retrieved")
                //when done retrieving data return them
                deferred.resolve(templates);
            });
        }
        else // we are offline, get data from file if possible
        {
            console.log("Application is offline, getting templates from local file, if there are some.")
            var text = FileService.read('templates').then(function(result)
            {
                templates = JSON.parse(result);
                // console.log("we are returning read: " + JSON.stringify(templates))
                deferred.resolve(templates);
            });
        }
        //return promise - now its just on object, but it will contain our data at some point
        return deferred.promise;

    }
    return {
        getTemplate: getTemplate,
        setTemplate: setTemplate,
        getTemplates: getTemplates,
        getResource: getResource
    }
})