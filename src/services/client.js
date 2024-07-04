import axios from "axios";

export function getHttpClient(url, method = 'GET', data = null) {
    let httpClient = axios.create();

    switch (method.toUpperCase()) {
        case 'GET':
            return httpClient.get(url);
        case 'POST':
            return httpClient.post(url, data);
        case 'PUT':
            return httpClient.put(url, data);
        case 'DELETE':
            return httpClient.delete(url, { data: data });
        default:
            return httpClient.get(url);
    }
}
