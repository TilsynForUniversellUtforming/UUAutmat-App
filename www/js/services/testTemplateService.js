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
        return $resource('http://localhost:3000/api/testTemplates/:id');
    }
    return {
        getTemplate: getTemplate,
        setTemplate: setTemplate,
        getResource: getResource
    }
})