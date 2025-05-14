'use strict'

// set timeout to 32 secs

export const handler = async(event) => {
    let url     = event.url || event.queryStringParameters?.url;
    let text    = '';
    let status  = 500; // assume the worst
    let base    = new URL(url).origin;
    let method  = 'GET';
    let headers = {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0 Safari/537.36',
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
      'Referer': base + '/',
      'Origin': base
    };

    try
    {
        let response = await fetch(url, { method, headers });
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
