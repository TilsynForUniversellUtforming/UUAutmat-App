angular.module('appMain.services')

.service('TestTemplateService', function($resource)
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

        //if online we should update data from db and display it
        return getResource().query();
        //in case we are offline we just return our local data, if we have any.

    }
    return {
        getTemplate: getTemplate,
        setTemplate: setTemplate,
        getTemplates: getTemplates,
        getResource: getResource
    }
})