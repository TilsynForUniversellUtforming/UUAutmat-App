angular.module('appMain.services', [])

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.factory('TestTemplateService', function($resource) {
    return $resource('api/testTemplates/:id');
})
.factory('TestObjectService', function($resource) {
    return $resource('api/nyobj/:id');
})
.factory('IndicatorService', function($resource) {
    return $resource('api/indicators/:id');
});