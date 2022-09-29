import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
    {
        path: '/unauth',
        name: 'unauth',
        component: () => import('../static/unauth.vue')
    },
    {
        path: '/:catchAll(.*)',
        name: '/404',
        component: () => import('../static/404.vue')
    },
]
const router = createRouter({
    history: createWebHashHistory(),
    routes
})


export default router

