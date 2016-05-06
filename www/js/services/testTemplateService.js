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
        return $resource('api/testTemplates/:id');
    }
    return {
        getTemplate: getTemplate,
        setTemplate: setTemplate,
        getResource: getResource
    }
})