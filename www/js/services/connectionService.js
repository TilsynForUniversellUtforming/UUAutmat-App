angular.module('appMain.services')
    .service("ConnectionService", function()
    {
        console.log("connection service reporting")
        var connectionType = null;
        var isOnline = null;
        document.addEventListener("offline", checkConnection, false);
        document.addEventListener("online", checkConnection, false);

        function checkConnection()
        {
            console.log("checking connection")
            var networkState = navigator.connection.type;

            var states = {};
            states[Connection.UNKNOWN] = 'Unknown connection';
            states[Connection.ETHERNET] = 'Ethernet connection';
            states[Connection.WIFI] = 'WiFi connection';
            states[Connection.CELL_2G] = 'Cell 2G connection';
            states[Connection.CELL_3G] = 'Cell 3G connection';
            states[Connection.CELL_4G] = 'Cell 4G connection';
            states[Connection.CELL] = 'Cell generic connection';
            states[Connection.NONE] = 'No network connection';

            connectionType = states[networkState];
            if (connectionType === 'Unknown connection' || connectionType === 'No network connection')
            {
                console.log("we are offline")
                onOffline();
            }
            else
            {
                console.log("we are using " + sstates[networkState]);
                onOnline();
            }
        }

        function onOnline()
        {
            console.log("GOING ONLINE")
            isOnline = true;


        }

        function onOffline()
        {
            console.log("GOING OFFLINE")
            isOnline = false;
        }
        return {
            connectionType: connectionType,
            isOnline: isOnline
        }
    })