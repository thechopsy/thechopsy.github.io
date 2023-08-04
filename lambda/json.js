'use strict'

// set timeout to 16 secs

export const handler = async(event) => {
    let url    = event.url || event.queryStringParameters?.url;
    let data   = undefined;
    let status = 500; // assume the worst

    try
    {
        let response = await fetch(url);
        status = response.status;
        data   = await response.json();
    }
    catch(err)
    {
        status = 500;
        data   = err.message || 'Internal failure';
    }

    return {
        statusCode: status,
        body: { url, data }
    }
}
