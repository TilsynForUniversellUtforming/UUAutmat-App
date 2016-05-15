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
        return $resource('http://torden.rogerww.com/api/testTemplates/:id');
    }

    function getTemplates()
    {
        var deferred = $q.defer();

        if (ConnectionService.getStatus())
        {
            console.log("Application is online, getting templates from remote server.")
            templates = getResource().query().$promise.then(function(result)
            {
                // console.log("we are writing this: " + JSON.stringify(result))
                FileService.write('templates', JSON.stringify(result))
                templates = result
                console.log("templates retrieved")
                deferred.resolve(templates);
            });
        }
        else
        {
            console.log("Application is offline, getting templates from local file, if there are some.")
            var text = FileService.read('templates').then(function(result)
            {
                templates = JSON.parse(result);
                // console.log("we are returning read: " + JSON.stringify(templates))
                deferred.resolve(templates);
            });
        }

        return deferred.promise;

    }
    return {
        getTemplate: getTemplate,
        setTemplate: setTemplate,
        getTemplates: getTemplates,
        getResource: getResource
    }
})