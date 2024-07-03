import Vue from 'vue';
import Router from 'vue-router';
import TasksList from '@/components/tasks/TasksList.vue';

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/tasks',
        },
        {
            path: '/tasks',
            name: 'TasksList',
            component: TasksList,
        },
        {
            path: '*',
            redirect: '/tasks',
        },
    ],
});
