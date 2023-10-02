let sharedData = {};

self.onconnect = function(e) {
    const port = e.ports[0];

    port.onmessage = function(event) {
        const { type, key, value } = event.data;

        switch (type) {
            case "set":
                sharedData[key] = value;
                break;

            case "get":
                port.postMessage({ key: key, value: sharedData[key] });
                break;
        }
    };
};