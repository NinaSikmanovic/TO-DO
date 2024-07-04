import axios from "axios";

export function getHttpClient(url, method = 'GET', data = null) {

    let httpClient = axios.create({
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
        },
    });

    switch (method.toUpperCase()) {
        case 'GET':
            return httpClient.get(url);
        case 'POST':
            return httpClient.post(url, data);
        case 'PUT':
            return httpClient.put(url, data);
        case 'DELETE':
            return httpClient.delete(url, data);
        default:
            return httpClient.get(url);
    }
}