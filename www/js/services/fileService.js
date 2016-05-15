angular.module('appMain.services')
    .service("FileService", function($cordovaFile, $rootScope, $q)
    {
        function write(filename, dataObj)
        {
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs)
            {

                console.log('file system open: ' + fs.name);
                fs.root.getFile(filename,
                {
                    create: true,
                    exclusive: false
                }, function(fileEntry)
                {

                    console.log("fileEntry is file?" + fileEntry.isFile.toString());
                    // fileEntry.name == 'someFile.txt'
                    // fileEntry.fullPath == '/someFile.txt'
                    writeFile(fileEntry, dataObj);

                }, function()
                {
                    console.log("error creating file")
                });

            }, function()
            {
                console.log("error loading fs")
            });
        }

        function read(filename)
        {
            var deferred = $q.defer();
            window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function(fs)
            {

                console.log('file system open: ' + fs.name);
                fs.root.getFile(filename,
                {
                    create: true,
                    exclusive: false
                }, function(fileEntry)
                {

                    console.log("fileEntry is file?" + fileEntry.isFile.toString());
                    // fileEntry.name == 'someFile.txt'
                    // fileEntry.fullPath == '/someFile.txt'
                    fileEntry.file(function(file)
                    {
                        var reader = new FileReader();

                        reader.onloadend = function()
                        {
                            console.log("Successful file read: " + this.result);
                            console.log(fileEntry.fullPath + ": " + this.result);
                            deferred.resolve(this.result)
                        };

                        reader.readAsText(file);

                    }, function()
                    {
                        console.log("error reading file")
                        deferred.reject("error reading file");
                    });

                }, function()
                {
                    console.log("error creating file")
                    deferred.reject("error creating file");

                });

            }, function()
            {
                console.log("error loading fs")
                deferred.reject("error leading file system");

            });
            return deferred.promise;
        }

        function writeFile(fileEntry, dataObj)
        {

            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function(fileWriter)
            {

                fileWriter.onwriteend = function()
                {
                    console.log("Successful file write...");
                    // readFile(fileEntry);
                };

                fileWriter.onerror = function(e)
                {
                    console.log("Failed file read: " + e.toString());
                };

                // If data object is not passed in,
                // create a new Blob instead.
                if (!dataObj)
                {
                    dataObj = new Blob(['some file data'],
                    {
                        type: 'text/plain'
                    });
                }

                fileWriter.write(dataObj);
            });
        }

        function readFile(fileEntry)
        {
            fileEntry.file(function(file)
            {
                var reader = new FileReader();

                reader.onloadend = function()
                {
                    console.log("Successful file read: " + this.result);
                    console.log(fileEntry.fullPath + ": " + this.result);
                    $rootScope.$broadcast("readDone", this.result);
                };

                reader.readAsText(file);

            }, function()
            {
                console.log("error reading file")
            });
        }
        return {
            write: write,
            read: read,
        }
    })