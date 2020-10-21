
/**
 * Sends a HTTP request to the REST API endpoint.
 * @param {string} route
 * @param {'GET' |'POST' |'PUT' |'DELETE'} method
 * @param {Object} data
 */
async function fetchRestEndpoint(route, method, data) {
    const options = { method };

    if (data) {
        options.headers = { 'Content-Type': 'application/json' };
        options.body = JSON.stringify(data);
    }

    const res = await fetch(route, options);

    if (!res.ok) {
        const error = new Error(`${method} ${res.url} ${res.status} (${res.statusText})`);
        error.response = res;
        throw error;
    }

    if (res.status !== 204) {
        return await res.json();
    } 
}

//eslint-disable-next-line
let languageData = await fetchRestEndpoint("/api/languagejson", "GET");
