import axios from 'axios';

const BASE_URL = 'https://jsonplaceholder.typicode.com/todos';

export const TasksService = {
    async getTasks() {
        return axios.get(`${BASE_URL}`+ "?_limit=10");
    },

    async deleteTask(id) {
        return axios.delete(`${BASE_URL}/${id}`);
    },

    async saveTask(data) {
        return axios.post(`${BASE_URL}`, data);
    },
};