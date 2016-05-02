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
    .service('TestService', function(TestObjectService, IndicatorService) {
        var currentTemplate = null;
        var testObjects = [];
        var indicators = [];

        var state = {
            current: {
                name: '',
                type: '',
                index: null
            },
            previous: {
                name: '',
                type: ''
            },
            next: {
                name: '',
                type: ''
            },
            index: 0,
            states: [{
                name: 'Generell Informasjon',
                type: 'general_info'
            }, {
                name: 'Virksomhet / Lokale',
                type: 'virksomhet_lokale'
            }, {
                name: "Oppsummering",
                type: 'overview'
            }],
            addIndicator: function(ind) {
                this.states.splice(this.states.length - 1, 0, ind);
            },
            addTestObject: function(tobj) {
                this.states.splice(this.states.length - 1, 0, tobj);
            },
            setStates: function() {
                this.current = this.states[this.index];
                if (this.index == 0) {
                    this.previous = ''
                } else {
                    this.previous = this.states[this.index - 1]
                }
                if (this.index == (this.states.length - 1)) {
                    this.next = ''
                } else {
                    this.next = this.states[this.index + 1]
                }
                console.log("Setting state: " + this.states[this.index].type)
                console.log(this.states)
            },
            next2: function() {
                console.log("lenght: " + this.states.length + " index: " + this.index)
                console.log(this.states)
                if (!(this.index >= this.states.length - 1)) {
                    this.index++;
                    this.setStates();
                }
            },
            previous2: function() {

                if (!this.index == 0) {
                    this.index--;
                    this.setStates();
                }
            }

        };

        function setTemplate(template) {
            if (template != null) {
                currentTemplate = template;
            }
        }

        function getTemplate() {
            return currentTemplate;
        }

        function setIndicators(template) {
            if (template == null) {
                template = currentTemplate
            }
            var t = 0;
            for (i = 0; i < template.indicators.length; i++) {
                IndicatorService.get({
                    id: template.indicators[i]
                }, function(r) {
                    indicators.push(r);
                    var obj = {
                        name: r.name,
                        type: 'indicator',
                        index: t
                    }
                    t++;
                    state.addIndicator(obj);
                    state.setStates();
                     console.log("Service: Adding Indiocator")
                })
            }

        }

        function getIndicators() {
            return indicators;
        }

        function setTestObjects(template) {
            if (template == null) {
                template = currentTemplate
            }
            var t = 0;
            for (i = 0; i < template.test_objects.length; i++) {
                TestObjectService.get({
                    id: template.test_objects[i]
                }, function(d) {
                    testObjects.push(d);
                    var obj = {
                        name: d.name,
                        type: 'test_object',
                        index: t
                    }
                    t++;
                    state.addTestObject(obj);
                    state.setStates();
                    console.log("Service: Adding Test Object")
                })
            }

        }

        function getTestObjects() {
            return testObjects;
        }
        function setupTest(){
            console.log("trying to setup the test")
            setTestObjects();
            setIndicators();
        }
        
        
        return {
            state: state,
            setupTest:setupTest,
            getIndicators:getIndicators,
            getTestObjects:getTestObjects,
            getTemplate:getTemplate,
            setTemplate:setTemplate,
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