import {getHttpClient} from "@/services/client";

const BASE_URL = process.env.VUE_APP_API_URL;

export const TasksService = {
    getTasks() {
        let url = BASE_URL + "/todos?_limit=10";
        return getHttpClient(url);
    },

    deleteTask(id) {
        let url = BASE_URL + "/todos/" + id;
        return getHttpClient(url, "DELETE");
    },

    saveTask(data) {
        let url = BASE_URL + "/todos/";
        return getHttpClient(url, "POST", data);
    },

    completeTask(data) {
        let url = BASE_URL + "/todos/" + data.id;
        return getHttpClient(url, "PUT", data);
    },
};