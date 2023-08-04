'use strict'

// set timeout to 32 secs

export const handler = async(event) => {
    let url    = event.url || event.queryStringParameters?.url;
    let text   = '';
    let status = 500; // assume the worst

    try
    {
        let response = await fetch(url);
        status = response.status;
        text   = await response.text();
    }
    catch(err)
    {
        status = 500;
        text   = err.message || 'Internal failure';
    }

    return {
        statusCode: status,
        body: { url, text }
    }
}
