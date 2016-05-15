angular.module('appMain.services')

.service('TestTemplateService', function($resource, ConnectionService, FileService)
{
    var template = null;

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
        if (ConnectionService.isOnline)
        {
            console.log("We are online, getting templates from remote server.")
            var obj = getResource().query();
            FileService.write('templates', JSON.stringify(obj))
            return obj;
        }
        else
        {
            console.log("We are offline, getting templates from local file, if there are some.  reading")
            var obj = JSON.parse(FileService.read('templates'))

        }
        //if online we should update data from db and display it

        //in case we are offline we just return our local data, if we have any.

    }
    return {
        getTemplate: getTemplate,
        setTemplate: setTemplate,
        getTemplates: getTemplates,
        getResource: getResource
    }
})