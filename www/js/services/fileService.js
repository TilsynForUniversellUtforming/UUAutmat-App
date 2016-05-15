angular.module('appMain.services')
    .service("FileService", function($cordovaFile)
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
            var stuff = "";
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
                    readFile(fileEntry, stuff);
                    return stuff;
                }, function()
                {
                    console.log("error creating file")
                    return stuff;
                });

            }, function()
            {
                console.log("error loading fs")
                return stuff;
            });
        }

        function writeFile(fileEntry, dataObj)
        {

            // Create a FileWriter object for our FileEntry (log.txt).
            fileEntry.createWriter(function(fileWriter)
            {

                fileWriter.onwriteend = function()
                {
                    console.log("Successful file read...");
                    readFile(fileEntry);
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

        function readFile(fileEntry, target)
        {
            fileEntry.file(function(file)
            {
                var reader = new FileReader();

                reader.onloadend = function()
                {
                    console.log("Successful file read: " + this.result);
                    console.log(fileEntry.fullPath + ": " + this.result);
                    target = this.result
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