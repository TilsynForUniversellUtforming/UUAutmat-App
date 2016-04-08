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
.service("dummyData", function(){
    return{
        getTyper:function(){
            var obj = 
            [
                {
                    "ID":"T0001",
                    "Name":"Automat test 1", 
                    "SyncStatus":1,
                    "AntallTester":5,
                    "Venter":0
                },
                 {
                    "ID":"T002",
                    "Name":"Automat test 2", 
                    "SyncStatus":0,
                    "AntallTester":3,
                    "Venter":1
                },
                {
                    "ID":"T002",
                    "Name":"Automat test 2", 
                    "SyncStatus":0,
                    "AntallTester":0,
                    "Venter":0
                }
            ];
            return obj;
        },
        getTestObjekter:function(id)
        {
            var obj=
            [
                {
                    "ID":"TO0001",
                    "TypeID":"T0001",
                    "Titel":"Kringsjå bilettautomat",
                    "SyncStatus":1,
                    "TestDato":"25. mars 2016, 14:25",
                    "SistEndretDato":"25. mars 2016, 14:55",
                    "AntallIndikatorer":4,
                    "AntallAktiviteter":25,
                    "FerdigStatus":
                    {
                        "Oversikt":1,
                        "TestObjekter":1,
                        "VirksomhetOgLokale":1,
                        "Kontroll":1
                    }
                },
                {
                    "ID":"TO0002",
                    "TypeID":"T0001",
                    "Titel":"Kringsjå bilettautomat 2",
                    "SyncStatus":1,
                    "TestDato":"25. mars 2016, 13:25",
                    "SistEndretDato":"25. mars 2016, 13:55",
                    "AntallIndikatorer":4,
                    "AntallAktiviteter":25,
                    "FerdigStatus":
                    {
                        "Oversikt":1,
                        "TestObjekter":1,
                        "VirksomhetOgLokale":1,
                        "Kontroll":1
                    }
                }
            ];

            if(id)
            {
                var result = [];
                for( i = 0; i < obj.length; i++)
                {
                    
                    if(obj[i].TypeID === id)
                    {
                        result.push(obj[i]);
                    }
                }
                return result;
            }
            else
            {  
                return obj;
            }
        }

    }
})