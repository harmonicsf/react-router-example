'use strict';

import request from 'superagent';

const HEADERS = {
  Accept: 'application/json'
};

var builder = (httpMethod, apiMethod, params, headers=HEADERS) => {
    let paramsTransport = httpMethod === 'get' ?
        'query' :
        'send';

    return new Promise((resolve, reject) => {
        request[httpMethod](apiMethod)
            .set(headers)
            [paramsTransport](params)
            .end((err, res) => {
                if (err || !res || !res.ok) {
                    reject(err);
                } else {
                    resolve(res.body, res);
                }
            });
    });
};

export default {
    get(apiMethod, params) {
        return builder('get', apiMethod, params);
    },

    post(apiMethod, params) {
        return builder('post', apiMethod, params);
    }
};
