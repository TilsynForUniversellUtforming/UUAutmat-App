angular.module('appMain.services')
    .service('IndicatorService', function($resource)
    {
        var indicator = null;

        function getResource()
        {
            return $resource('api/indicators/:id');
        }

        function getIndicator()
        {
            return indicator;
        }

        function setIndicator(ind)
        {
            indicator = ind;
        }
        return {
            getIndicator: getIndicator,
            getResource: getResource,
            setIndicator: setIndicator
        }
    });